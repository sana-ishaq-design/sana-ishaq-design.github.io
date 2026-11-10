import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'});
const results=[];
try{
 for(const width of [1440,1024,768,390,320])for(const theme of ['light','dark']){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  await context.addInitScript(t=>localStorage.setItem('portfolio-review-theme',t),theme);
  const page=await context.newPage();await page.goto('http://127.0.0.1:4321/case-studies/haiermall-case-study.html');await page.evaluate(()=>document.fonts.ready);
  const obscured=[];
  for(const direction of ['Shift+Tab','Tab']){
   await page.locator('.case-credits>a').focus();
   for(let i=0;i<40;i++){
    await page.keyboard.press(direction);
    const problem=await page.evaluate(()=>{
     const e=document.activeElement;
     if(!(e instanceof HTMLAnchorElement)||e.closest('.full-header,.chapter-navigation')||e.classList.contains('skip-link'))return null;
     const r=e.getBoundingClientRect();
     const blockers=[document.querySelector('.full-header'),document.querySelector('.chapter-navigation')].filter(n=>['sticky','fixed'].includes(getComputedStyle(n).position));
     const blocked=blockers.some(n=>{const b=n.getBoundingClientRect();return r.top<b.bottom&&r.bottom>b.top&&r.left<b.right&&r.right>b.left});
     return blocked?{text:e.textContent.trim(),top:r.top}:null;
    });
    if(problem)obscured.push({direction,...problem});
   }
  }
  assert.deepEqual(obscured,[],`${width} ${theme}: focus must not be obscured`);
  results.push({width,theme,forwardAndReverseTab:true,obscuredLinks:0});await context.close();
 }
 console.log(JSON.stringify(results));
}finally{await browser.close()}
