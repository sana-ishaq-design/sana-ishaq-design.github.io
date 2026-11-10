import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import {resolve,extname} from 'node:path';
import assert from 'node:assert/strict';
const dir='review/collection-pagination';await mkdir(dir,{recursive:true});
function serve(folder,port){const root=resolve(folder);const server=createServer(async(req,res)=>{try{const file=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root))throw Error();res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'application/javascript','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2'})[extname(file)]||'application/octet-stream');res.end(await readFile(file))}catch{res.statusCode=404;res.end('Not found')}});return new Promise(r=>server.listen(port,'127.0.0.1',()=>r(server)))}
const servers=await Promise.all([serve('dist',4391),serve('review/collection-fixture-build',4392)]);
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'});const results=[];
const ready=async p=>{await p.evaluate(()=>document.fonts.ready);await p.locator('.collection-filters button:not([disabled])').first().waitFor()};
const ids=p=>p.locator('article').evaluateAll(es=>es.map(e=>e.id));
try{
for(const width of [1440,1024,768,390,320])for(const theme of ['light','dark']){
 const ctx=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});await ctx.addInitScript(t=>{if(!localStorage.getItem('portfolio-review-theme'))localStorage.setItem('portfolio-review-theme',t)},theme);
 const p=await ctx.newPage();await p.addInitScript(()=>{window.qaCLS=0;new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.qaCLS+=e.value}).observe({type:'layout-shift',buffered:true})});await p.goto('http://127.0.0.1:4391/case-studies.html');await ready(p);
 const capture=async(name,selector)=>{if(selector)await p.locator(selector).evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY-24));await p.screenshot({path:`${dir}/${width}-${theme}-${name}.png`})};
 await capture('opening');await capture('featured','.collection-filters');await capture('grid','.collection-grid');
 const defaultAxe=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.deepEqual(defaultAxe.violations.map(v=>v.id),[]);
 if(width===1440){await p.setViewportSize({width,height:1900});await capture('featured-and-grid','.collection-filters');await p.setViewportSize({width,height:1000})}
 const cls=await p.evaluate(()=>window.qaCLS);assert.ok(cls<0.1,"CLS: "+cls);
 assert.deepEqual(await ids(p),['haiermall','subscribe-a-car','utworx','barcode-studio']);assert.equal(await p.locator('.collection-pagination').count(),0);
 for(const [name,expected] of [['E-commerce',['haiermall']],['SaaS & Enterprise',['utworx']],['Mobile Apps',['subscribe-a-car']],['UX Audits',['haiermall','utworx']],['Design Systems',['haiermall','subscribe-a-car','barcode-studio']]]){
 await p.getByRole('button',{name,exact:true}).click();assert.deepEqual(await ids(p),expected);assert.equal(await p.locator('.featured-card').count(),0);assert.equal(await p.getByRole('button',{name,exact:true}).getAttribute('aria-pressed'),'true');
 }
 await capture('selected-filter','.collection-filters');
 const axe=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.deepEqual(axe.violations.map(v=>v.id),[]);
 await p.goBack();assert.deepEqual(await ids(p),['haiermall','utworx']);await p.goForward();assert.equal((await ids(p)).length,3);await p.reload();await ready(p);assert.equal((await ids(p)).length,3);
 await p.getByRole('button',{name:'All Work',exact:true}).click();await p.locator('#barcode-studio').scrollIntoViewIfNeeded();await p.waitForTimeout(100);
 const checks=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,images:[...document.querySelectorAll('main img')].every(i=>i.complete&&i.naturalWidth),canonical:document.querySelectorAll('link[rel="canonical"]').length}));assert.equal(checks.overflow,false);assert.equal(checks.images,true);assert.equal(checks.canonical,1);
 const boxes=await p.locator('.collection-card').evaluateAll(es=>es.map(e=>({x:e.getBoundingClientRect().x,y:e.getBoundingClientRect().y})));if(width>700)assert.equal(boxes[0].y,boxes[1].y);else assert.equal(boxes[0].x,boxes[1].x);
 await p.getByRole('button',{name:'All Work',exact:true}).focus();await p.keyboard.press('Tab');assert.notEqual(await p.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle),'none');await p.keyboard.press('Enter');assert.deepEqual(await ids(p),['haiermall']);
 await p.locator('.theme-toggle').click();await p.reload();await ready(p);assert.equal(await p.locator('html').getAttribute('data-preference'),theme==='light'?'dark':'light');
 results.push({width,theme,cls,...checks,filters:true,history:true,keyboard:true,axeViolations:0});await ctx.close();
}
const ctx=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});const p=await ctx.newPage();await p.addInitScript(()=>{window.qaCLS=0;new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.qaCLS+=e.value}).observe({type:'layout-shift',buffered:true})});await p.goto('http://127.0.0.1:4392/case-studies.html');await ready(p);
const seen=[...await ids(p)];assert.equal(seen.length,4);await p.getByRole('link',{name:'Next',exact:true}).click();await p.waitForURL('**/page/2.html');assert.equal(await p.locator('.featured-card').count(),0);seen.push(...await ids(p));assert.equal(await p.evaluate(()=>document.activeElement.id),'collection-start');
await p.evaluate(()=>document.documentElement.dataset.preference='dark');await p.locator('.collection-pagination').scrollIntoViewIfNeeded();await p.screenshot({path:`${dir}/fixture-desktop-page-2.png`});
await p.getByRole('link',{name:'Next',exact:true}).click();seen.push(...await ids(p));assert.equal(seen.length,9);assert.equal(new Set(seen).size,9);await p.goBack();assert.equal((await ids(p)).length,4);await p.reload();await ready(p);assert.equal((await ids(p)).length,4);assert.equal(await p.locator('link[rel="canonical"]').getAttribute('href'),'https://sana-ishaq-design.github.io/case-studies/page/2.html');
await p.getByRole('button',{name:'Mobile Apps',exact:true}).click();assert.equal(new URL(p.url()).pathname,'/case-studies.html');assert.equal((await ids(p)).length,4);await p.getByRole('link',{name:'Next',exact:true}).click();assert.equal((await ids(p)).length,1);
await p.setViewportSize({width:320,height:1000});await p.evaluate(()=>document.documentElement.dataset.preference='light');await p.locator('.collection-pagination').scrollIntoViewIfNeeded();assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await p.screenshot({path:`${dir}/fixture-mobile-filtered-page-2.png`});
assert.deepEqual((await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations.map(v=>v.id),[]);await ctx.close();
const nojs=await browser.newContext({javaScriptEnabled:false});const n=await nojs.newPage();await n.goto('http://127.0.0.1:4391/case-studies.html');assert.equal(await n.locator('article').count(),4);const links=await n.locator('a[href^="/"]').evaluateAll(es=>[...new Set(es.map(e=>e.getAttribute('href').split('#')[0]))]);for(const href of links)assert.equal((await n.request.get('http://127.0.0.1:4391'+href)).status(),200,href);
await n.goto('http://127.0.0.1:4392/case-studies/page/2.html');assert.equal(await n.locator('article').count(),4);await n.getByRole('link',{name:'Next',exact:true}).click();assert.equal(await n.locator('article').count(),1);await nojs.close();
assert.ok(!(await readFile('dist/case-studies.html','utf8')).includes('QA fixture'));
await writeFile(`${dir}/results.json`,JSON.stringify({results,fixture:{count:9,pages:[4,4,1],filterBeforePagination:true,noDuplicates:true,staticNoJavaScript:true},localLinks:links.length},null,2));console.log('PASS: 10 viewport/theme combinations, filters/history/keyboard/axe, nine-project static pagination, links, no-JS.');
}finally{await browser.close();servers.forEach(s=>s.close())}

