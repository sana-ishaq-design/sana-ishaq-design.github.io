import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir,writeFile,readFile } from 'node:fs/promises';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import ProjectOutcomes from '../src/components/ProjectOutcomes.ts';

const base = 'http://127.0.0.1:4321';
const output = 'review/hybrid';
const browser = await chromium.launch({executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',headless:true});
const results = [];
function contrast(foreground,background) {
  const luminance=color=>{
    const values=color.match(/[\d.]+/g).slice(0,3).map(Number).map(value=>{const v=value/255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});
    return values[0]*.2126+values[1]*.7152+values[2]*.0722;
  };
  const a=luminance(foreground),b=luminance(background);
  return Math.round((Math.max(a,b)+.05)/(Math.min(a,b)+.05)*100)/100;
}
async function openMenu(page,width) {
  if(width<=650 && await page.locator('#header-menu').getAttribute('open')===null) await page.locator('#header-menu summary').click();
}
async function closeMenu(page,width) {
  if(width<=650 && await page.locator('#header-menu').getAttribute('open')!==null) {
    await page.getByLabel('Appearance').press('Escape');
    assert.equal(await page.locator('#header-menu').getAttribute('open'),null,'Escape closes disclosure');
    assert.equal(await page.evaluate(()=>document.activeElement?.tagName),'SUMMARY','Escape restores focus');
  }
}
try {
  const noJs = await browser.newContext({javaScriptEnabled:false, colorScheme:'light',viewport:{width:320,height:844}});
  const plain = await noJs.newPage();
  await plain.goto(`${base}/phase-1.html`);
  assert.equal(await plain.locator('h1').isVisible(),true,'Core content must remain visible without JavaScript');
  assert.equal(await plain.getByLabel('Appearance').isDisabled(),true,'Inactive no-JS appearance control must be disabled honestly');
  assert.equal(await plain.evaluate(()=>document.querySelector('.header-menu-panel').getBoundingClientRect().bottom<=document.querySelector('h1').getBoundingClientRect().top),true,'No-JS navigation stays in flow without covering content');
  await noJs.close();

  for (const width of [1440,768,390,320]) {
    for (const theme of ['light','dark']) {
      const context=await browser.newContext({viewport:{width,height:width>=768?900:844},colorScheme:'light',reducedMotion:'reduce'});
      const page=await context.newPage();
      const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      await page.goto(`${base}/phase-1.html`);
      await openMenu(page,width);
      await page.getByLabel('Appearance').selectOption(theme);
      if(width<=650) {
        const menuA11y=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
        assert.deepEqual(menuA11y.violations.map(v=>v.id),[],`${width}/${theme} open menu accessibility`);
        if(width===390) {
          await mkdir(output,{recursive:true});
          await page.screenshot({path:`${output}/${theme}-390-menu.png`});
        }
      }
      await closeMenu(page,width);
      await page.evaluate(()=>document.fonts.ready);
      // Exercise actual disclosure keys, tab order and anchor focus.
      if(width<=650) {
        const summary=page.locator('#header-menu summary');
        await summary.focus(); await page.keyboard.press('Space');
        assert.notEqual(await page.locator('#header-menu').getAttribute('open'),null,'Space opens menu');
        await page.keyboard.press('Tab');
        assert.equal(await page.evaluate(()=>document.activeElement?.textContent.trim()),'Work','Tab enters navigation');
        await page.keyboard.press('Enter');
        assert.equal(await page.locator('#header-menu').getAttribute('open'),null,'Work closes mobile menu');
        assert.equal(await page.evaluate(()=>document.activeElement?.id),'selected-work','Work moves focus to destination');
        await summary.focus(); await page.keyboard.press('Enter');
        assert.notEqual(await page.locator('#header-menu').getAttribute('open'),null,'Enter opens menu');
        await closeMenu(page,width);
      }
      // Exercise normal keyboard navigation and actual native preference control.
      await page.getByRole('link',{name:'Skip to content'}).focus();
      await page.keyboard.press('Enter');
      assert.equal(new URL(page.url()).hash,'#main','Keyboard skip link navigates to main content');
      const state=await page.evaluate(()=>({
        preference:document.documentElement.dataset.preference,
        background:getComputedStyle(document.body).backgroundColor,
        overflow:document.documentElement.scrollWidth>innerWidth,
        fonts:document.fonts.check('16px "Manrope Variable"')&&document.fonts.check('italic 16px "Instrument Serif"'),
      }));
      assert.equal(state.preference,theme);
      assert.equal(state.background,theme==='light'?'rgb(242, 244, 234)':'rgb(32, 47, 42)');
      assert.equal(state.overflow,false,`${width}/${theme} horizontal overflow`);
      assert.equal(state.fonts,true,'Local fonts loaded');
      const baseline=JSON.parse(await readFile('content/baseline.json','utf8'));
      assert.equal((await page.locator('h1').innerText()).replace(/\s+/g,' ').trim(),baseline.heroHeadline,'Exact SEO headline');
      assert.equal(await page.locator('.project-outcomes').count(),0,'No unverified result area');
      assert.equal(await page.locator('.artwork-detail').count(),0,'Single dominant original screen');
      const imageBox=await page.locator('.project-artwork').boundingBox();
      assert.equal(imageBox.x,0,'Project image field starts at viewport edge');
      assert.equal(imageBox.width,width,'Project image field spans full viewport');
      assert.equal(await page.getByText(/Value pending|Sales measure|Bounce-rate measure|Discovery-time measure/).count(),0,'No private outcome placeholders');
      const pairs=await page.evaluate(()=>['body','.hero-bottom p','.text-link','.hero-role','.design-question','.proposal-label'].map(selector=>({selector,foreground:getComputedStyle(document.querySelector(selector)).color,background:getComputedStyle(document.body).backgroundColor})));
      const contrastPairs=pairs.map(pair=>({...pair,ratio:contrast(pair.foreground,pair.background)}));
      assert.ok(contrastPairs.every(pair=>pair.ratio>=4.5),`${width}/${theme} rendered text contrast`);
      await page.locator('.project-figure').scrollIntoViewIfNeeded();
      await page.locator('.project-artwork img').evaluateAll(images=>Promise.all(images.map(i=>i.decode())));
      const a11y=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
      if(a11y.violations.length) console.log(JSON.stringify(a11y.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),null,2));
      assert.deepEqual(a11y.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.length})),[],`${width}/${theme} accessibility violations`);
      await page.evaluate(()=>window.scrollTo(0,0));
      await mkdir(output,{recursive:true});
      await page.screenshot({path:`${output}/${theme}-${width}.png`,fullPage:true});
      await page.screenshot({path:`${output}/${theme}-${width}-hero.png`});
      await page.reload();
      await page.waitForFunction(()=>!document.querySelector('#theme-preference').disabled);
      assert.equal(await page.getByLabel('Appearance').inputValue(),theme,'Preference persists on refresh');
      assert.deepEqual(errors,[],'No runtime errors');
      results.push({width,theme,...state,contrastPairs,axeViolations:0});
      await context.close();
    }
  }
  const keyboard=await browser.newContext({viewport:{width:390,height:844},colorScheme:'light'});
  const keyPage=await keyboard.newPage();await keyPage.goto(base+'/phase-1.html');
  await openMenu(keyPage,390);
  const control=keyPage.getByLabel('Appearance');await control.focus();await control.press('End');await control.press('Enter');
  assert.equal(await control.inputValue(),'dark','Keyboard selects final theme option');
  await control.press('Escape'); // Dismiss the native select popup before closing its containing disclosure.
  await closeMenu(keyPage,390);await keyboard.close();
  const fixtures=await browser.newContext({viewport:{width:1440,height:900},colorScheme:'light'});
  const fixturePage=await fixtures.newPage();await fixturePage.goto(base+'/phase-1.html');
  const outcomeLayouts=[];
  for(const theme of ['light','dark']) for(const width of [1440,768,390,320]) for(const count of [1,2,3]) {
    await fixturePage.evaluate(theme=>document.documentElement.dataset.preference=theme,theme);
    await fixturePage.setViewportSize({width,height:900});
    const records=Array.from({length:count},(_,i)=>({id:'synthetic-'+i,value:'Test value',label:'Synthetic test measure',context:'Test fixture only. Not project evidence.',source:'/case-studies/haiermall-case-study.html',approval:'owner-approved'}));
    const html=renderToStaticMarkup(createElement(ProjectOutcomes,{outcomes:records}));
    await fixturePage.evaluate(markup=>{document.querySelector('.project-outcomes')?.remove();document.querySelector('.project-insight').insertAdjacentHTML('afterend',markup)},html);
    assert.equal(await fixturePage.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Outcome count '+count+' fits '+width);
    assert.equal(await fixturePage.locator('.outcome-list dt').count(),count);
    const outcomeA11y=await new AxeBuilder({page:fixturePage}).include('.project-outcomes').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    assert.deepEqual(outcomeA11y.violations.map(v=>v.id),[],'Synthetic approved-result layout accessibility');
    outcomeLayouts.push({theme,width,count,overflow:false,axeViolations:0});
  }
  await fixtures.close();
  const blocked=await browser.newContext({viewport:{width:390,height:844},colorScheme:'dark'});
  await blocked.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Storage unavailable','SecurityError')}}));
  const page=await blocked.newPage();
  await page.goto(`${base}/phase-1.html`);
  await openMenu(page,390);
  await page.getByLabel('Appearance').selectOption('light');
  assert.equal(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(242, 244, 234)','Theme works with storage denied');
  await page.getByLabel('Appearance').selectOption('system');
  assert.equal(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(32, 47, 42)','System preference follows dark device');
  await page.emulateMedia({colorScheme:'light'});
  assert.equal(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(242, 244, 234)','System preference responds to changes');
  await blocked.close();
  const stress=await browser.newContext({viewport:{width:1440,height:900},colorScheme:'light',reducedMotion:'reduce'});
  const stressPage=await stress.newPage();
  await stressPage.goto(`${base}/phase-1.html`);
  const intermediate=[];
  for(const theme of ['light','dark']) {
    for(const width of [360,480,600,650,651,820,1024,1280]) {
      await stressPage.setViewportSize({width,height:900});
      await openMenu(stressPage,width);
      await stressPage.getByLabel('Appearance').selectOption(theme);
      const menu=await stressPage.evaluate(()=>({right:document.querySelector('.header-menu-panel').getBoundingClientRect().right,width:innerWidth}));
      assert.ok(menu.right<=menu.width+1,`${width} menu fits viewport`);
      await closeMenu(stressPage,width);
      assert.equal(await stressPage.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${width}/${theme} intermediate overflow`);
      intermediate.push({width,theme,overflow:false});
    }
  }
  await stressPage.setViewportSize({width:320,height:844});
  await stressPage.evaluate(()=>{
    const elements=[...document.querySelectorAll('h1,h2,h3,h4,p,dt,dd,a,span,select,label,summary')];
    const sizes=elements.map(e=>[e,parseFloat(getComputedStyle(e).fontSize)*2]);
    for(const [element,size] of sizes) element.style.fontSize=`${size}px`;
  });
  assert.equal(await stressPage.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'200% text-size stress at 320px fits');
  await openMenu(stressPage,320);
  assert.equal(await stressPage.getByLabel('Appearance').isVisible(),true,'Menu theme remains available at enlarged text');
  await closeMenu(stressPage,320);
  await stressPage.screenshot({path:`${output}/text-200-percent-320.png`,fullPage:true});
  await stressPage.emulateMedia({forcedColors:'active'});
  await stressPage.locator('#header-menu summary').focus();
  assert.notEqual(await stressPage.locator('#header-menu summary').evaluate(e=>getComputedStyle(e).outlineStyle),'none','Forced-colors focus visible');
  await stress.close();
  await writeFile(`${output}/verification.json`,JSON.stringify({results,intermediate,outcomeLayouts,keyboardMenu:true,keyboardTheme:true,noJavaScript:true,storageDenied:true,systemChanges:true,textResize200:true,reflow320:true,forcedColorsFocus:true},null,2));
  console.log(JSON.stringify({viewports:results.length,intermediate:intermediate.length,outcomeLayouts:outcomeLayouts.length,keyboardMenu:true,keyboardTheme:true,axeViolations:0,noJavaScript:true,storageDenied:true,systemChanges:true,textResize200:true,reflow320:true,forcedColorsFocus:true}));
} finally { await browser.close(); }
