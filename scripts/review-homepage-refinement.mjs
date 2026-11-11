import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {createServer} from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import assert from 'node:assert/strict';
const remote=process.env.PREVIEW_URL,root=resolve('dist-preview');
const server=remote?null:createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://local').pathname);if(!pathname.startsWith('/portfolio-preview/'))throw Error();const file=resolve(root,pathname.slice(19)||'index.html');if(!file.startsWith(root))throw Error();res.setHeader('Content-Type',({'.svg':'image/svg+xml','.html':'text/html','.js':'application/javascript','.css':'text/css','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2'})[extname(file)]||'application/octet-stream');res.end(await readFile(file))}catch{res.statusCode=404;res.end()}});
if(server)await new Promise(r=>server.listen(4397,'127.0.0.1',r));
const base=remote||'http://127.0.0.1:4397/portfolio-preview/';
const out='review/homepage-refinement/'+(remote?'public':'local');await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'});
const results=[];
try{for(const width of [1440,1024,768,390,320])for(const theme of ['light','dark']){
 const c=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});await c.addInitScript(t=>{if(!localStorage.getItem('portfolio-review-theme'))localStorage.setItem('portfolio-review-theme',t)},theme);
 const p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 for(const route of ['','archive.html']){assert.equal((await p.goto(base+route)).status(),200);await p.locator('.theme-toggle:not([disabled])').waitFor();await p.evaluate(()=>document.fonts.ready);
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.match(await p.locator('meta[name="robots"]').getAttribute('content'),/noindex/);
  assert.equal(await p.locator('.archive-row').count(),0);assert.equal(await p.locator('.archive-dialog').count(),0);assert.equal(await p.locator('.archive-empty').count(),1);
  const axe=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.deepEqual(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.html)})),[],route+' '+width+' '+theme);
  if(route===''){for(const [label,id] of [['Explore Selected Work','selected-work'],['Get in Touch','contact']]){const link=p.locator('.hero-actions').getByRole('link',{name:label});await link.focus();await p.keyboard.press('Enter');assert.equal(new URL(p.url()).hash,'#'+id)}
   assert.equal(await p.locator('#contact a').count(),1);assert.equal(await p.locator('#contact a').getAttribute('href'),'mailto:sanaishaq47@gmail.com');
   assert.equal(await p.locator('.expertise-list a').count(),0);
   assert.equal(await p.locator('.expertise-list dt').count(),4);
   assert.equal(await p.locator('#expertise-title').textContent(),'Core Expertise');
   const geometry=await p.evaluate(()=>{const box=s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.x,y:r.y,bottom:r.bottom,right:r.right}};return {paragraph:box('.hero-bottom>p'),actions:box('.hero-actions'),title:box('#hero-title'),personal:box('.about-copy'),expertise:box('.about-expertise')}});
   assert.ok(geometry.actions.y>=geometry.paragraph.bottom+20,'CTAs follow paragraph');assert.ok(Math.abs(geometry.actions.x-geometry.paragraph.x)<1);assert.ok(Math.abs(geometry.actions.x-geometry.title.x)<1);
   if(width>900){assert.ok(geometry.expertise.x>geometry.personal.right+20);assert.ok(Math.abs(geometry.expertise.y-geometry.personal.y)<1)}else assert.ok(geometry.expertise.y>=geometry.personal.bottom+40);
   if(width<=1000){await p.locator('#full-menu summary').click();await p.keyboard.press('Escape');assert.equal(await p.locator('#full-menu').getAttribute('open'),null)}
  }
  if([1440,390].includes(width))for(const id of route?['archive-title','site-footer']:['hero-title','selected-work','archive','about','expertise-title','contact','site-footer']){await p.evaluate(()=>{if(document.activeElement instanceof HTMLElement)document.activeElement.blur()});await p.locator('#'+id).evaluate(e=>scrollTo(0,Math.max(0,e.getBoundingClientRect().top+scrollY-60)));await p.screenshot({path:out+'/'+width+'-'+theme+'-'+(route?'archive-':'')+id+'.png'})}
  assert.deepEqual(errors,[]);results.push({width,theme,route,axeViolations:0,overflow:false});
 }
 await p.locator('.theme-toggle').click();await p.reload();assert.equal(await p.locator('html').getAttribute('data-preference'),theme==='light'?'dark':'light');await c.close();
}
// Exercise the retained popup with isolated test-only DOM. No fixture is published.
for(const width of [1440,320]){const c=await browser.newContext({viewport:{width,height:900}});const p=await c.newPage();await p.route('**/archive.html',async route=>{const response=await route.fetch();const html=await response.text();await route.fulfill({response,body:html.replace('</main>','<a id="archive-link-qa" href="#archive-qa" data-project-note="qa">QA fixture only</a></main>').replace('</body>','<dialog class="archive-dialog" id="archive-dialog-qa" aria-labelledby="qa-title"><button data-close-note>Close</button><h2 id="qa-title">QA fixture only</h2><a href="#qa-title">Last control</a></dialog></body>')})});await p.goto(base+'archive.html');await p.locator('[data-project-note="qa"][aria-haspopup="dialog"]').waitFor();const link=p.locator('#archive-link-qa');await link.focus();await p.keyboard.press('Enter');await p.locator('dialog[open]').waitFor();assert.match(p.url(),/#archive-qa$/);await p.keyboard.press('Shift+Tab');assert.equal(await p.evaluate(()=>document.activeElement.textContent),'Last control');await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.activeElement.textContent),'Close');await p.keyboard.press('Escape');await p.waitForTimeout(150);assert.equal(await p.locator('dialog[open]').count(),0);assert.equal(await link.evaluate(e=>e===document.activeElement),true);await p.goForward();await p.locator('dialog[open]').waitFor();await p.goBack();assert.equal(await p.locator('dialog[open]').count(),0);await p.goto(base+'archive.html#archive-qa');await p.locator('dialog[open]').waitFor();await p.keyboard.press('Escape');assert.equal(await p.locator('dialog[open]').count(),0);await c.close()}
const request=await browser.newContext();assert.equal((await request.request.get(base+'ux-audit-service-page.html')).status(),404,'Excluded pricing URL must return 404');await request.close();
await writeFile(out+'/results.json',JSON.stringify({base,results,pricingStatus:404,popupFixture:'keyboard, focus, Back/Forward and direct fragment passed at 1440 and 320; no published projects'},null,2));console.log('PASS 20 page/theme/width states, layout geometry, accessibility, navigation, theme persistence, pricing 404 and isolated popup fixture.');
}finally{await browser.close();if(server)server.close()}
