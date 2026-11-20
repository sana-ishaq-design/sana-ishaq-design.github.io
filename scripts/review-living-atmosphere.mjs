import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {createServer} from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import assert from 'node:assert/strict';
const remote=process.env.PREVIEW_URL,root=resolve('dist-preview');
const server=remote?null:createServer(async(req,res)=>{try{const pathname=new URL(req.url,'http://local').pathname;if(!pathname.startsWith('/portfolio-preview/'))throw Error();const file=resolve(root,pathname.slice(19)||'index.html');if(!file.startsWith(root))throw Error();res.setHeader('Content-Type',({'.svg':'image/svg+xml','.html':'text/html','.js':'application/javascript','.css':'text/css','.woff2':'font/woff2'})[extname(file)]||'application/octet-stream');res.end(await readFile(file))}catch{res.statusCode=404;res.end()}});
if(server)await new Promise(r=>server.listen(4401,'127.0.0.1',r));
const base=remote||'http://127.0.0.1:4401/portfolio-preview/',out='review/living-atmosphere/'+(remote?'public':'local');await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'}),results=[];
const percentile=(a,p)=>a.length?[...a].sort((x,y)=>x-y)[Math.min(a.length-1,Math.floor(a.length*p))]:null;
try{
 for(const width of [1440,1024,768,390,320])for(const theme of ['light','dark']){
  const c=await browser.newContext({viewport:{width,height:1000},reducedMotion:'no-preference'});await c.addInitScript(t=>localStorage.setItem('portfolio-review-theme',t),theme);const p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'living-atmosphere.html');await p.evaluate(()=>document.fonts.ready);await p.waitForFunction(()=>window.atmosphereMetrics?.mode==='animated'||window.atmosphereMetrics?.mode==='static'||window.atmosphereMetrics?.error);
  if(width>900){await p.waitForFunction(()=>document.body.classList.contains('volume-ready'),{timeout:20000});await p.waitForTimeout(width===1440?12000:3000);}else await p.waitForTimeout(1500);
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.equal((await p.locator('#hero-title').innerText()).replace(/\s+/g,' '),'Helping SaaS Products & Ecommerce Brands Build Better Digital Experiences');
  assert.equal(await p.locator('.hero-mist').count(),0); const art=await p.locator('.artwork-landscape').evaluate(e=>getComputedStyle(e).backgroundImage); assert.ok(art.includes(theme==='light'?'first-light':'juniper-dusk')); assert.equal(art.includes('-mobile'),width<=900); await p.evaluate(async()=>{const image=new Image(); image.src=getComputedStyle(document.querySelector('.artwork-landscape')).backgroundImage.slice(5,-2);await image.decode();});
  await p.screenshot({path:`${out}/${width}-${theme}.png`});
  const m=await p.evaluate(()=>window.atmosphereMetrics);assert.equal(m.mode,width>900?'animated':'static');
  const axe=await new AxeBuilder({page:p}).include('.hero').include('.full-header').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.deepEqual(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.html)})),[]);
  if(width>900){
   await p.locator('.atmosphere-controls summary').click();const controlAxe=await new AxeBuilder({page:p}).include('.atmosphere-controls').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.deepEqual(controlAxe.violations.map(v=>v.id),[]);await p.locator('#cloud-density').focus();await p.keyboard.press('ArrowRight');assert.equal(await p.locator('output[for="cloud-density"]').textContent(),'1.25');
   await p.locator('#cloud-pause').focus();await p.keyboard.press('Enter');await p.waitForTimeout(100);const frames=await p.evaluate(()=>window.atmosphereMetrics.frames);await p.waitForTimeout(700);assert.equal(await p.evaluate(()=>window.atmosphereMetrics.frames),frames);await p.locator('.atmosphere-controls summary').click();await p.screenshot({path:`${out}/${width}-${theme}-paused.png`});await p.locator('.atmosphere-controls summary').click();await p.locator('#cloud-pause').focus();await p.keyboard.press('Enter');await p.locator('#cloud-reset').click();await p.locator('.atmosphere-controls summary').click();
   await p.locator('#contact').scrollIntoViewIfNeeded();await p.waitForTimeout(500);const off=await p.evaluate(()=>window.atmosphereMetrics.frames);await p.waitForTimeout(700);assert.equal(await p.evaluate(()=>window.atmosphereMetrics.frames),off);
   await p.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await p.waitForTimeout(500);
   await p.emulateMedia({reducedMotion:'reduce'});await p.waitForTimeout(200);assert.equal(await p.locator('.volume-landscape').evaluate(e=>getComputedStyle(e).display),'none');const reduce=await p.evaluate(()=>window.atmosphereMetrics.frames);await p.waitForTimeout(500);assert.equal(await p.evaluate(()=>window.atmosphereMetrics.frames),reduce);
  }
  assert.deepEqual(errors,[]);results.push({width,theme,startupMs:m.startupMs,cpuP95:percentile(m.cpuMs,.95),gpuP95:percentile(m.gpuMs,.95),intervalP50:percentile(m.intervalMs,.5),intervalP95:percentile(m.intervalMs,.95),quality:m.quality,canvas:m.canvas,frames:m.frames,axeViolations:0});await c.close();
 }
 for(const mode of ['no-js','no-webgl','context-loss']){const c=await browser.newContext({viewport:{width:1440,height:1000},javaScriptEnabled:mode!=='no-js'});if(mode==='no-webgl')await c.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='webgl2'?null:original.call(this,type,...args)}});const p=await c.newPage();await p.goto(base+'living-atmosphere.html');await p.waitForTimeout(2000);if(mode==='context-loss'){await p.waitForFunction(()=>document.body.classList.contains('volume-ready'));await p.locator('canvas').evaluate(e=>e.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());await p.waitForTimeout(300);}assert.equal(await p.locator('body').evaluate(e=>e.classList.contains('volume-ready')),false);assert.equal(await p.locator('#hero-title').isVisible(),true);await c.close();}
 await writeFile(out+'/results.json',JSON.stringify({results,fallbacks:['no-js','no-webgl','context-loss'],note:'CPU is submission time; GPU timings may be unavailable. Desktop Chrome only.'},null,2));console.log(JSON.stringify(results));
}finally{await browser.close();server?.close();}
