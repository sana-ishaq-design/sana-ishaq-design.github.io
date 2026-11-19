import {chromium} from 'playwright';

import {createServer} from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import assert from 'node:assert/strict';
const remote=process.env.PREVIEW_URL,root=resolve('dist-preview');
const server=remote?null:createServer(async(req,res)=>{try{const pathname=new URL(req.url,'http://local').pathname;if(!pathname.startsWith('/portfolio-preview/'))throw Error();const file=resolve(root,pathname.slice(19)||'index.html');if(!file.startsWith(root))throw Error();res.setHeader('Content-Type',({'.svg':'image/svg+xml','.html':'text/html','.js':'application/javascript','.css':'text/css','.woff2':'font/woff2'})[extname(file)]||'application/octet-stream');res.end(await readFile(file))}catch{res.statusCode=404;res.end()}});
if(server)await new Promise(r=>server.listen(4402,'127.0.0.1',r));
const base=remote||'http://127.0.0.1:4402/portfolio-preview/',out='review/living-atmosphere/'+(remote?'public':'local');await mkdir(out,{recursive:true});
import sharp from 'sharp';
const lum=rgb=>rgb.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'}),report=[];
try{for(const theme of ['light','dark']){const c=await b.newContext({viewport:{width:1440,height:1000}});await c.addInitScript(t=>localStorage.setItem('portfolio-review-theme',t),theme);const p=await c.newPage();await p.goto(base+'living-atmosphere.html');await p.waitForFunction(()=>document.body.classList.contains('volume-ready'));await p.waitForTimeout(2000);
 const areas=await p.locator('.hero-role,h1,h1 em,.hero-bottom>p,.hero-actions a').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,color:s.color.match(/[\d.]+/g).slice(0,3).map(v=>Number(v)*(s.color.startsWith('color(srgb')?255:1)),threshold:parseFloat(s.fontSize)>=24?3:4.5}}));
 const hidden=await p.addStyleTag({content:'.hero-heading *,.hero-bottom>p,.hero-actions a{color:transparent!important}.hero-actions svg{visibility:hidden}'});
 let min=100,failed=[];for(let i=0;i<4;i++){await p.waitForTimeout(2000);const pixels=await sharp(await p.screenshot()).removeAlpha().raw().toBuffer({resolveWithObject:true});for(const a of areas){let worst=100;for(let y=Math.ceil(a.y);y<Math.min(pixels.info.height,a.bottom);y+=3)for(let x=Math.ceil(a.x);x<a.right;x+=3){const o=(y*pixels.info.width+x)*3,L=lum([...pixels.data.subarray(o,o+3)]),F=lum(a.color);worst=Math.min(worst,(Math.max(F,L)+.05)/(Math.min(F,L)+.05));}min=Math.min(min,worst);if(worst<a.threshold)failed.push({i,worst,threshold:a.threshold,y:a.y});}}
 await hidden.evaluate(e=>e.remove());await p.screenshot({path:out+'/contrast-'+theme+'.png'});assert.deepEqual(failed,[]);report.push({theme,min,failed});console.log(JSON.stringify(report.at(-1)));await c.close();}
 await writeFile(out+'/contrast.json',JSON.stringify(report,null,2));}finally{await b.close();server?.close();}
