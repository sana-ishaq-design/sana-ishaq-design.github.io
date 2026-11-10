import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import {resolve,extname} from 'node:path';
const root=resolve('dist');
const server=createServer(async(req,res)=>{try{const file=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root))throw Error();const bytes=await readFile(file);res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'application/javascript','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2'})[extname(file)]||'application/octet-stream');res.end(bytes)}catch{res.statusCode=404;res.end('Not found')}});
await new Promise(r=>server.listen(4391,'127.0.0.1',r));
import assert from 'node:assert/strict';
const dir='review/collection-final';await mkdir(dir,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'});const results=[];
try{for(const width of [1440,1024,768,390,320])for(const theme of ['light','dark']){
const ctx=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});await ctx.addInitScript(t=>{if(!localStorage.getItem('portfolio-review-theme'))localStorage.setItem('portfolio-review-theme',t)},theme);const page=await ctx.newPage();await page.goto('http://127.0.0.1:4391/case-studies.html');await page.evaluate(()=>document.fonts.ready);
const capture=async(name,selector)=>{if(selector)await page.locator(selector).evaluate(e=>window.scrollTo(0,e.getBoundingClientRect().top+scrollY-24));await page.waitForTimeout(100);await page.screenshot({path:`${dir}/${width}-${theme}-${name}.png`})};
await capture('opening');for(const id of ['haiermall','subscribe-a-car','utworx','barcode-studio'])await capture(id,'#'+id);await capture('ending','.collection-contact');
const checks=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash),brokenImages:[...document.querySelectorAll('main img')].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),articles:document.querySelectorAll('article').length}));assert.equal(checks.overflow,false);assert.deepEqual(checks.brokenAnchors,[]);assert.deepEqual(checks.brokenImages,[]);assert.equal(checks.articles,4);
await page.evaluate(()=>scrollTo(0,0));const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.deepEqual(axe.violations.map(v=>v.id),[]);
await page.locator('.collection-index a[href="#utworx"]').click();assert.equal(new URL(page.url()).hash,'#utworx');await page.keyboard.press('Tab');const focus=await page.evaluate(()=>({outline:getComputedStyle(document.activeElement).outlineStyle,top:document.activeElement.getBoundingClientRect().top,bottom:document.activeElement.getBoundingClientRect().bottom}));assert.notEqual(focus.outline,'none');assert.ok(focus.top>=0&&focus.bottom<=1000);
await page.locator('.theme-toggle').click();await page.reload();assert.equal(await page.locator('html').getAttribute('data-preference'),theme==='light'?'dark':'light');
if(width<=1000){await page.locator('#full-menu summary').click();assert.equal(await page.locator('#full-menu').getAttribute('open'),'');await page.keyboard.press('Escape');assert.equal(await page.locator('#full-menu').getAttribute('open'),null)}
results.push({width,theme,...checks,axeViolations:0,jumpNavigation:true,keyboardFocus:true,themePersistence:true});await ctx.close();}
const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});const page=await nojs.newPage();await page.goto('http://127.0.0.1:4391/case-studies.html');assert.equal(await page.locator('article').count(),4);const paths=await page.locator('a[href^="/"]').evaluateAll(as=>[...new Set(as.map(a=>a.getAttribute('href').split('#')[0]))]);for(const path of paths)assert.equal((await page.request.get('http://127.0.0.1:4391'+path)).status(),200,path);await nojs.close();await writeFile(`${dir}/results.json`,JSON.stringify({results,noJavaScript:true,localLinksChecked:paths.length},null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close();server.close()}

