import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {createServer} from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import assert from 'node:assert/strict';
const remote=process.env.PREVIEW_URL,root=resolve('dist-preview');
const server=remote?null:createServer(async(req,res)=>{try{const pathname=new URL(req.url,'http://local').pathname;if(!pathname.startsWith('/portfolio-preview/'))throw Error();const file=resolve(root,pathname.slice(19)||'index.html');if(!file.startsWith(root))throw Error();res.setHeader('Content-Type',({'.svg':'image/svg+xml','.html':'text/html','.js':'application/javascript','.css':'text/css','.woff2':'font/woff2'})[extname(file)]||'application/octet-stream');res.end(await readFile(file))}catch{res.statusCode=404;res.end()}});
if(server)await new Promise(r=>server.listen(4399,'127.0.0.1',r));
const base=remote||'http://127.0.0.1:4399/portfolio-preview/',out='review/process-stack/'+(remote?'public':'local');await mkdir(out,{recursive:true});
const copy=JSON.parse(await readFile('src/content/homepage.json','utf8'));
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'}),results=[];
try {
 for(const theme of ['light','dark'])for(const [width,height,motion] of [[1440,1100,'no-preference'],[1024,1100,'no-preference'],[768,1100,'no-preference'],[390,900,'no-preference'],[320,900,'no-preference'],[1440,720,'no-preference'],[1440,1100,'reduce']]){
  const c=await browser.newContext({viewport:{width,height},reducedMotion:motion});await c.addInitScript(t=>localStorage.setItem('portfolio-review-theme',t),theme);const p=await c.newPage();await p.goto(base);await p.evaluate(()=>document.fonts.ready);await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});
  for(const [i,step] of copy.process.entries()){assert.equal(await p.locator('.process-list h3').nth(i).textContent(),step.title);assert.equal(await p.locator('.process-list p').nth(i).textContent(),step.description)}
  const sticky=width>1000&&height>=900&&motion==='no-preference';assert.equal(await p.locator('.process-list li').first().evaluate(e=>getComputedStyle(e).position),sticky?'sticky':'static');
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await p.locator('#process').evaluate(e=>scrollTo(0,e.offsetTop-150));
  await p.screenshot({path:`${out}/${width}-${theme}-${motion}-start.png`});
  if(sticky){await p.locator('.process-list li').last().evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY-parseFloat(getComputedStyle(e).top)+10));
   const boxes=await p.locator('.process-list li').evaluateAll(es=>es.map(e=>({top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom,titleBottom:e.querySelector('h3').getBoundingClientRect().bottom})));
   for(let i=0;i<4;i++)assert.ok(boxes[i].titleBottom<=boxes[i+1].top,JSON.stringify(boxes));assert.ok(boxes[4].bottom<=height);
   await p.screenshot({path:`${out}/${width}-${theme}-stacked.png`});
   const old=await p.evaluate(()=>scrollY);await p.keyboard.press('PageUp');await p.waitForTimeout(500);assert.ok(await p.evaluate(()=>scrollY)<old);
  }
  const axe=await new AxeBuilder({page:p}).include('#process').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.deepEqual(axe.violations.map(v=>v.id),[]);
  await p.emulateMedia({media:'print'});assert.equal(await p.locator('.process-list li').first().evaluate(e=>getComputedStyle(e).position),'static');
  results.push({width,height,theme,motion,sticky,axeViolations:0});await c.close();
 }
 const c=await browser.newContext({javaScriptEnabled:false});const p=await c.newPage();await p.goto(base);assert.equal(await p.locator('.process-list li').count(),5);for(const step of copy.process)assert.ok((await p.locator('#process').textContent()).includes(step.description));await c.close();
 await writeFile(out+'/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify({passed:results.length,initialHTML:true,print:true,results}));
}finally{await browser.close();server?.close()}
