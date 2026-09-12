const LOGO_API='https://api.github.com/repos/MaximumJusticeCybersecurity/SetasMushrooms/contents/library/SETAS5.png?ref=main';
module.exports=async function handler(req,res){
  if(req.method!=='GET'){res.statusCode=405;res.setHeader('Allow','GET');return res.end('Method Not Allowed');}
  try{
    const r=await fetch(LOGO_API,{headers:{Accept:'application/vnd.github+json','User-Agent':'mjc-site-top-chef'},signal:AbortSignal.timeout(5000)});
    if(!r.ok)throw new Error(`upstream ${r.status}`);
    const data=await r.json();
    if(!data.content||data.encoding!=='base64')throw new Error('invalid logo payload');
    const body=Buffer.from(String(data.content).replace(/\n/g,''),'base64');
    res.statusCode=200;
    res.setHeader('Content-Type','image/png');
    res.setHeader('Cache-Control','public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');
    res.setHeader('X-Content-Type-Options','nosniff');
    return res.end(body);
  }catch{
    res.statusCode=502;
    res.setHeader('Cache-Control','no-store');
    return res.end('Logo unavailable');
  }
};
