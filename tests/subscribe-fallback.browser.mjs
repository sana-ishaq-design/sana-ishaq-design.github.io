import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'});
const results=[];
try{
 for(const width of [1440,390,320]){
  const context=await browser.newContext({viewport:{width,height:900},javaScriptEnabled:false});
  const page=await context.newPage();
  for(const id of ['challenge','journey','management','system','screens','outcomes','outcomes-grid','reflection']){
   await page.goto('http://127.0.0.1:4321/case-studies/subscribe-me-case-study.html#'+id);
   assert.equal(await page.locator('#'+id).count(),1);
   assert.equal((await page.locator('main h1').innerText()).replace(/\s+/g,' '),'Subscribe a Car');
   assert.ok(await page.locator('#outcomes-grid').innerText().then(t=>t.includes('100K+')&&t.includes('3.9★')));
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   assert.equal(await page.locator('.chapter-navigation').evaluate(e=>getComputedStyle(e).position),'relative');
  }
  results.push({width,javaScriptDisabled:true,legacyFragments:8,contentAvailable:true,noOverflow:true});await context.close();
 }
 console.log(JSON.stringify(results));
}finally{await browser.close()}
