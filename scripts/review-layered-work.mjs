import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {createServer} from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const remote=process.env.PREVIEW_URL,root=resolve('dist-preview');
const server=remote?null:createServer(async(req,res)=>{try{const pathname=new URL(req.url,'http://local').pathname;if(!pathname.startsWith('/portfolio-preview/'))throw Error();const file=resolve(root,pathname.slice(19)||'index.html');if(!file.startsWith(root))throw Error();res.setHeader('Content-Type',({'.svg':'image/svg+xml','.html':'text/html','.js':'application/javascript','.css':'text/css','.woff2':'font/woff2'})[extname(file)]||'application/octet-stream');res.end(await readFile(file))}catch{res.statusCode=404;res.end()}});
if(server)await new Promise(r=>server.listen(4408,'127.0.0.1',r));
const base=remote||'http://127.0.0.1:4408/portfolio-preview/',folder='review/layered-work/'+(remote?'public':'local');await mkdir(folder,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'}),results=[];
const lum=rgb=>rgb.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
try{
 for(const width of [1440,1024,768,390,320])for(const theme of ['light','dark']){
 const c=await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:1});await c.addInitScript(t=>localStorage.setItem('portfolio-review-theme',t),theme);
 const p=await c.newPage(),errors=[],failed=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)failed.push(r.url())});
 await p.goto(base+'layered-work.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1800);
 assert.equal(await p.evaluate(()=>visualViewport.scale),1);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 assert.deepEqual(await p.locator('.hb-value').allTextContents(),['+31%','−20%','+40%','+15%']);assert.equal(await p.locator('.ridge-panel').count(),3);
 const initial=await p.locator('.ridge-panel').evaluateAll(es=>es.map(e=>({y:e.getBoundingClientRect().top+scrollY,h:e.getBoundingClientRect().height,position:getComputedStyle(e).position})));
 assert.ok(initial.every(e=>e.position===(width===1440?'sticky':'relative')));
 if(width===1440||width===390)await p.screenshot({path:`${folder}/${width}-${theme}-hero.png`});
 // Every source image must decode, and every destination is directly requestable.
 for(const image of await p.locator('.ridge-stack img').all()){await image.scrollIntoViewIfNeeded();await image.evaluate(i=>i.decode());}
 for(const href of new Set(await p.locator('.ridge-stack a,.work-intro a').evaluateAll(es=>es.map(e=>e.href))))assert.equal((await p.request.get(href)).status(),200);
 for(let i=0;i<3;i++){
  await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),initial[i].y-144-i*20);await p.waitForTimeout(150);
  if(width===1440)await p.screenshot({path:`${folder}/${width}-${theme}-project-${i+1}.png`});
 }
 if(width===1440){
  await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),initial[1].y-350);await p.screenshot({path:`${folder}/1440-${theme}-overlap.png`});
  const pinned=await p.locator('.ridge-panel').first().boundingBox();assert.ok(Math.abs(pinned.y-144)<2);
  await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),initial[2].y+initial[2].h-200);assert.ok((await p.locator('.ridge-panel').last().boundingBox()).y<184);
  await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),initial[0].y-144);assert.ok(Math.abs((await p.locator('.ridge-panel').first().boundingBox()).y-144)<2);
  // Start while covered, then tab forwards/backwards. Focus must be topmost and in view.
  await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),initial[2].y-184);await p.keyboard.press('Tab');await p.locator('.hb-image-link').focus();
  for(const key of ['Tab','Tab','Shift+Tab','Shift+Tab']){await p.keyboard.press(key);await p.waitForTimeout(100);assert.ok(await p.evaluate(()=>{const e=document.activeElement,r=e.getBoundingClientRect(),header=document.querySelector('.full-header').getBoundingClientRect();return r.top>header.bottom&&r.bottom<innerHeight&&e.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))&&getComputedStyle(e).outlineStyle!=='none'}));assert.equal(await p.locator('.ridge-panel').first().evaluate(e=>getComputedStyle(e).position),'relative');}
  await p.evaluate(()=>document.activeElement.blur());
 }
 await p.emulateMedia({reducedMotion:'reduce'});assert.equal(await p.locator('.ridge-panel').first().evaluate(e=>getComputedStyle(e).position),'relative');
 const axe=await new AxeBuilder({page:p}).include('.ridge-stack').include('.work-intro').include('.hero').include('.full-header').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.deepEqual(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.html)})),[]);
 if(width===390){for(let i=0;i<3;i++){const panel=p.locator('.ridge-panel').nth(i),height=await panel.evaluate(e=>Math.ceil(e.getBoundingClientRect().height+180));await p.setViewportSize({width,height});await panel.evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY-140,behavior:'instant'}));await panel.screenshot({path:`${folder}/390-${theme}-project-${i+1}.png`});}await p.setViewportSize({width,height:1000});}
 await p.emulateMedia({reducedMotion:'no-preference'});
 await p.setViewportSize({width,height:700});assert.equal(await p.locator('.ridge-panel').first().evaluate(e=>getComputedStyle(e).position),'relative');await p.setViewportSize({width,height:1000});
 // Pixel-sample the background beneath transition text while atmosphere runs.
 await p.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await p.waitForTimeout(500);
 const areas=await p.locator('.work-intro h2,.work-intro a').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return{x:r.x,y:r.y,right:r.right,bottom:r.bottom,color:s.color.match(/[\d.]+/g).slice(0,3).map(v=>Number(v)*(s.color.startsWith('color(srgb')?255:1))}}));
 const hide=await p.addStyleTag({content:'.work-intro>*{visibility:hidden!important}'});let contrast=100;
 for(let n=0;n<(width===1440?3:1);n++){await p.waitForTimeout(800);const pixels=await sharp(await p.screenshot()).removeAlpha().raw().toBuffer({resolveWithObject:true});for(const a of areas)for(let y=Math.max(0,Math.ceil(a.y));y<Math.min(pixels.info.height,a.bottom);y+=2)for(let x=Math.ceil(a.x);x<Math.min(pixels.info.width,a.right);x+=2){const o=(y*pixels.info.width+x)*3,L=lum([...pixels.data.subarray(o,o+3)]),F=lum(a.color);contrast=Math.min(contrast,(Math.max(F,L)+.05)/(Math.min(F,L)+.05));}}
 await p.screenshot({path:folder+'/contrast-background-'+theme+'.png'});await hide.evaluate(e=>e.remove());assert.ok(contrast>=4.5,`${width} ${theme} transition contrast ${contrast}`);
 assert.deepEqual(await p.locator('a[href^="#"]').evaluateAll(es=>es.filter(e=>!document.getElementById(decodeURIComponent(e.getAttribute('href').slice(1)))).map(e=>e.getAttribute('href'))),[]);assert.equal(await p.locator('link[rel="canonical"]').count(),1);assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);const atmosphere=await p.evaluate(()=>window.atmosphereMetrics);results.push({width,theme,stack:initial[0].position,axeViolations:0,transitionContrast:contrast,atmosphereMode:atmosphere.mode,canvas:atmosphere.canvas,keyboard:width===1440?'forward/backward unobscured':'static flow'});console.log(results.at(-1));await c.close();
 }
 // No-script retains all project content, metrics and links in ordinary flow.
 const c=await browser.newContext({javaScriptEnabled:false,viewport:{width:1440,height:1000}}),p=await c.newPage();await p.goto(base+'layered-work.html');assert.equal(await p.locator('.ridge-panel').count(),3);assert.equal(await p.locator('.ridge-panel').first().evaluate(e=>getComputedStyle(e).position),'relative');assert.equal(await p.locator('h1').count(),1);assert.equal(await p.locator('meta[name="robots"]').getAttribute('content'),'noindex, nofollow, noarchive');await c.close();
 await writeFile(folder+'/results.json',JSON.stringify(results,null,2));
}finally{await browser.close();server?.close();}






