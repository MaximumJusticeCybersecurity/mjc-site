const LOGO='https://raw.githubusercontent.com/MaximumJusticeCybersecurity/SetasMushrooms/main/library/SETAS5.png';
module.exports=async function handler(req,res){
  if(req.method!=='GET'){res.statusCode=405;res.setHeader('Allow','GET');return res.end('Method Not Allowed');}
  try{
    const r=await fetch(LOGO,{signal:AbortSignal.timeout(5000)});
    if(!r.ok)throw new Error(`upstream ${r.status}`);
    const body=Buffer.from(await r.arrayBuffer());
    res.statusCode=200;
    res.setHeader('Content-Type',r.headers.get('content-type')||'image/png');
    res.setHeader('Cache-Control','public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');
    res.setHeader('X-Content-Type-Options','nosniff');
    return res.end(body);
  }catch{
    res.statusCode=502;
    res.setHeader('Cache-Control','no-store');
    return res.end('Logo unavailable');
  }
};
