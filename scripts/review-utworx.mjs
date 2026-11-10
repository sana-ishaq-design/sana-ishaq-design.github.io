import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import {resolve,extname} from 'node:path';
const root=resolve('dist');
const server=createServer(async(req,res)=>{try{const file=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root))throw Error();const bytes=await readFile(file);res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'application/javascript','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2'})[extname(file)]||'application/octet-stream');res.end(bytes)}catch{res.statusCode=404;res.end('Not found')}});
await new Promise(r=>server.listen(4388,'127.0.0.1',r));
import assert from 'node:assert/strict';
const dir='review/utworx-implementation';await mkdir(dir,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'});
const results=[];
try{for(const width of [1440,1024,768,390,320])for(const theme of ['light','dark']){
 const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});await context.addInitScript(t=>localStorage.setItem('portfolio-review-theme',t),theme);
 const page=await context.newPage();await page.goto('http://127.0.0.1:4388/case-studies/utworx-case-study.html');await page.evaluate(()=>document.fonts.ready);
 await page.waitForSelector('.utworx-case');
 const base=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,canonicals:document.querySelectorAll('link[rel="canonical"]').length,h1:document.querySelectorAll('h1').length,brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash)}));
 assert.equal(base.overflow,false);assert.equal(base.canonicals,1);assert.equal(base.h1,1);assert.deepEqual(base.brokenAnchors,[]);
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
 await page.screenshot({path:`${dir}/${width}-${theme}-opening.png`});
 const sections=['dashboard','workorders','maintenance','reporting','impact'];
 for(const id of sections){await page.locator('#'+id).scrollIntoViewIfNeeded();await page.evaluate(id=>{const e=document.getElementById(id);window.scrollTo(0,e.offsetTop-parseFloat(getComputedStyle(document.body).getPropertyValue('--case-chapter-offset'))-24)},id);await page.waitForTimeout(120);if([1440,390].includes(width))await page.screenshot({path:`${dir}/${width}-${theme}-${id}.png`});}
 await page.locator('.ut-footer').scrollIntoViewIfNeeded();if([1440,390].includes(width))await page.screenshot({path:`${dir}/${width}-${theme}-ending.png`});
 if([1440,390,320].includes(width)){await page.locator('#maintenance .ut-maintenance-details > figure').evaluate(e=>window.scrollTo(0,e.getBoundingClientRect().top+scrollY-parseFloat(getComputedStyle(document.body).getPropertyValue('--case-chapter-offset'))-24));await page.screenshot({path:dir+'/'+width+'-'+theme+'-detail.png'});}
 const imageErrors=await page.locator('main img').evaluateAll(imgs=>imgs.filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src));assert.deepEqual(imageErrors,[]);
 const nav=page.locator('.chapter-navigation');if(width<=1100)await nav.locator('summary').click();await nav.locator('a[href="#dashboard"]').click();await page.waitForTimeout(150);assert.equal(await nav.locator('a[href="#dashboard"]').getAttribute('aria-current'),'location');
 const obscured=[];for(const key of ['Tab','Shift+Tab']){await page.locator('.ut-footer a').focus();for(let i=0;i<24;i++){await page.keyboard.press(key);const bad=await page.evaluate(()=>{const e=document.activeElement;if(!(e instanceof HTMLAnchorElement)||e.closest('.full-header,.chapter-navigation')||e.classList.contains('skip-link'))return false;const r=e.getBoundingClientRect();return [...document.querySelectorAll('.full-header,.chapter-navigation')].some(n=>{if(!['sticky','fixed'].includes(getComputedStyle(n).position))return false;const b=n.getBoundingClientRect();return r.top<b.bottom&&r.bottom>b.top})});if(bad)obscured.push({key,element:await page.evaluate(()=>({text:document.activeElement.textContent,html:document.activeElement.outerHTML.slice(0,180),top:document.activeElement.getBoundingClientRect().top,height:document.activeElement.getBoundingClientRect().height}))})}}assert.deepEqual(obscured,[]);
 results.push({keyboardFocus:true,width,theme,...base,axe:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.length})),images:imageErrors,chapterNavigation:true});await context.close();
}
 const live=await browser.newContext();const lp=await live.newPage();await lp.goto('http://127.0.0.1:4388/case-studies/utworx-case-study.html');await lp.locator('.theme-toggle').click();const preference=await lp.locator('html').getAttribute('data-preference');await lp.reload();assert.equal(await lp.locator('html').getAttribute('data-preference'),preference);await live.close();
 const fallback=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});const fp=await fallback.newPage();await fp.goto('http://127.0.0.1:4388/case-studies/utworx-case-study.html');assert.equal(await fp.locator('.chapter-navigation nav a').count(),7);const paths=await fp.locator('a[href^="/"]').evaluateAll(as=>[...new Set(as.map(a=>a.getAttribute('href').split('#')[0]))]);for(const path of paths){const response=await fp.request.get('http://127.0.0.1:4388'+path);assert.equal(response.status(),200,path)}await fallback.close();
 await writeFile(`${dir}/results.json`,JSON.stringify({matrix:results,themePersistence:true,noJavaScriptNavigation:true,localLinksChecked:paths.length},null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close();server.close()}





