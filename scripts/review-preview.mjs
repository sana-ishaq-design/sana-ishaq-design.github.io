import {chromium} from 'playwright';
import {createServer} from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import assert from 'node:assert/strict';
const external=process.env.PREVIEW_URL;
const root=resolve('dist-preview');
const server=external?null:createServer(async(req,res)=>{try{
 let pathname=decodeURIComponent(new URL(req.url,'http://local').pathname);
 if(!pathname.startsWith('/portfolio-preview/'))throw Error('Outside preview');
 const file=resolve(root,pathname.slice('/portfolio-preview/'.length)||'index.html');
 if(!file.startsWith(root))throw Error();
 res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'application/javascript','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.pdf':'application/pdf'})[extname(file)]||'application/octet-stream');res.end(await readFile(file));
}catch{res.statusCode=404;res.end()}});
if(server)await new Promise(r=>server.listen(4396,'127.0.0.1',r));
const base=external||'http://127.0.0.1:4396/portfolio-preview/';
const output='review/staging-'+(external?'public':'local');await mkdir(output,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'});
const routes=['','case-studies.html',...['haiermall','subscribe-me','utworx','barcode-studio'].map(n=>'case-studies/'+n+'-case-study.html')];
const results=[];const links=new Set();
try{for(const width of [1440,1024,768,390,320])for(const theme of ['light','dark']){
 const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
 await context.addInitScript(t=>{if(!localStorage.getItem('portfolio-review-theme'))localStorage.setItem('portfolio-review-theme',t)},theme);
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const route of routes){const response=await page.goto(base+route);assert.equal(response.status(),200,route);await page.evaluate(()=>document.fonts.ready);
  await page.locator('.theme-toggle:not([disabled])').waitFor();
  await page.evaluate(async()=>{for(const img of document.images){img.loading='eager'}await Promise.all([...document.images].map(img=>img.complete?Promise.resolve():new Promise(r=>{img.onload=r;img.onerror=r})));});
  const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>i.getAttribute('src')&&!i.naturalWidth).map(i=>i.src),robots:document.querySelector('meta[name=robots]')?.content,theme:document.documentElement.dataset.preference,links:[...document.querySelectorAll('a[href]')].map(a=>a.href)}));
  assert.equal(state.overflow,false,route+' '+width);assert.deepEqual(state.broken,[],route);assert.match(state.robots,/noindex/);assert.equal(state.theme,theme);assert.deepEqual(errors,[],route);
  for(const link of state.links){const u=new URL(link);if(u.origin===new URL(base).origin){assert.ok(u.pathname.startsWith('/portfolio-preview/'),link);links.add(u.origin+u.pathname)}}
  if([1440,390].includes(width))await page.screenshot({path:output+'/'+width+'-'+theme+'-'+(route?route.split('/').at(-1).replace('.html',''):'homepage')+'.png'});
  results.push({route,width,theme,overflow:false,brokenImages:0,noindex:true});
 }
 await page.locator('.theme-toggle').click();await page.reload();assert.equal(await page.locator('html').getAttribute('data-preference'),theme==='light'?'dark':'light');
 await context.close();
}
const request=await browser.newContext();for(const link of links){const response=await request.request.get(link);assert.equal(response.status(),200,link)}await request.close();
await writeFile(output+'/results.json',JSON.stringify({base,results,internalLinks:links.size},null,2));console.log('PASS '+results.length+' page/width/theme checks and '+links.size+' internal destinations.');
}finally{await browser.close();if(server)server.close()}
