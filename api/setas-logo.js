const LOGO_API='https://api.github.com/repos/MaximumJusticeCybersecurity/SetasMushrooms/contents/library/SETAS5.png?ref=main';
const FALLBACK=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 260" role="img" aria-label="Setas Mushrooms"><rect width="720" height="260" fill="white" fill-opacity="0"/><g fill="#1f6a3c"><path d="M92 74c-34 0-62 24-70 56h140c-8-32-36-56-70-56Z"/><rect x="72" y="124" width="40" height="78" rx="18"/><circle cx="61" cy="112" r="7" fill="white"/><circle cx="94" cy="101" r="8" fill="white"/><circle cx="124" cy="115" r="6" fill="white"/></g><text x="190" y="122" font-family="Arial,Helvetica,sans-serif" font-size="68" font-weight="800" fill="#1f6a3c" letter-spacing="2">SETAS</text><text x="194" y="177" font-family="Arial,Helvetica,sans-serif" font-size="34" font-weight="700" fill="#142218" letter-spacing="5">MUSHROOMS</text></svg>`;
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
    res.statusCode=200;
    res.setHeader('Content-Type','image/svg+xml; charset=utf-8');
    res.setHeader('Cache-Control','public, max-age=300, s-maxage=300');
    res.setHeader('X-Content-Type-Options','nosniff');
    return res.end(FALLBACK);
  }
};
