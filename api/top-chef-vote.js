const { createHmac } = require('node:crypto');

const VALID_CHEFS = new Set(['chef-1','chef-2','chef-3','chef-4']);
const MAX_BODY_BYTES = 1024;

function sendJson(res,statusCode,payload){
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.setHeader('Cache-Control','no-store, max-age=0');
  res.setHeader('X-Content-Type-Options','nosniff');
  res.statusCode=statusCode;
  if(typeof res.json==='function') return res.json(payload);
  return res.end(JSON.stringify(payload));
}

function header(req,name){
  const value=(req.headers||{})[name.toLowerCase()]||'';
  return Array.isArray(value)?String(value[0]||''):String(value||'');
}

function parseBody(req){
  if(req.body && typeof req.body==='object' && !Buffer.isBuffer(req.body)){
    const raw=JSON.stringify(req.body);
    if(Buffer.byteLength(raw,'utf8')>MAX_BODY_BYTES) return {error:'REQUEST_TOO_LARGE'};
    return {value:req.body};
  }
  const raw=Buffer.isBuffer(req.body)?req.body.toString('utf8'):String(req.body||'');
  if(Buffer.byteLength(raw,'utf8')>MAX_BODY_BYTES) return {error:'REQUEST_TOO_LARGE'};
  try{return {value:raw?JSON.parse(raw):{}}}catch{return {error:'INVALID_JSON'}}
}

function allowedOrigin(req){
  const origin=header(req,'origin');
  if(!origin) return false;
  const allowed=new Set(['https://app.maximumjusticecybersecurity.com']);
  if(process.env.VERCEL_URL) allowed.add(`https://${process.env.VERCEL_URL}`);
  return allowed.has(origin);
}

function clientIp(req){
  return header(req,'x-vercel-forwarded-for').split(',')[0].trim() ||
    header(req,'x-forwarded-for').split(',')[0].trim() ||
    req.socket?.remoteAddress || 'unknown';
}

function voterKey(req){
  const salt=String(process.env.TOP_CHEF_VOTE_SALT||'');
  return createHmac('sha256',salt)
    .update(`${clientIp(req)}\n${header(req,'user-agent')}`,'utf8')
    .digest('hex');
}

function kvConfig(){
  const url=String(process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL||'').replace(/\/$/,'');
  const token=String(process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN||'');
  return {url,token};
}

async function redis(command){
  const {url,token}=kvConfig();
  const response=await fetch(url,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(command)});
  const payload=await response.json().catch(()=>({}));
  if(!response.ok || payload.error) throw new Error('KV_ERROR');
  return payload.result;
}

module.exports=async function handler(req,res){
  if(req.method!=='POST'){
    res.setHeader('Allow','POST');
    return sendJson(res,405,{ok:false,code:'METHOD_NOT_ALLOWED'});
  }
  if(!header(req,'content-type').toLowerCase().includes('application/json')) return sendJson(res,415,{ok:false,code:'JSON_REQUIRED'});
  if(!allowedOrigin(req)) return sendJson(res,403,{ok:false,code:'ORIGIN_NOT_ALLOWED'});

  const parsed=parseBody(req);
  if(parsed.error) return sendJson(res,parsed.error==='REQUEST_TOO_LARGE'?413:400,{ok:false,code:parsed.error});
  if(String(parsed.value.website||'').trim()) return sendJson(res,422,{ok:false,code:'AUTOMATED_SUBMISSION_REJECTED'});

  const chef=String(parsed.value.chef||'');
  if(!VALID_CHEFS.has(chef)) return sendJson(res,422,{ok:false,code:'INVALID_CHEF'});

  const {url,token}=kvConfig();
  if(!url || !token || !String(process.env.TOP_CHEF_VOTE_SALT||'').trim()) return sendJson(res,503,{ok:false,code:'VOTE_STORE_UNAVAILABLE'});

  try{
    const voter=`setas:top-chef:2026:voter:${voterKey(req)}`;
    const claimed=await redis(['SET',voter,chef,'NX','EX',60*60*24*14]);
    if(claimed!=='OK') return sendJson(res,409,{ok:false,code:'DUPLICATE_VOTE'});
    await redis(['HINCRBY','setas:top-chef:2026:totals',chef,1]);
    return sendJson(res,200,{ok:true,code:'VOTE_RECORDED'});
  }catch{
    return sendJson(res,502,{ok:false,code:'VOTE_STORE_ERROR'});
  }
};
