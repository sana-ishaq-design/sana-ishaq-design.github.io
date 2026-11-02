import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir,writeFile } from 'node:fs/promises';

const base = 'http://127.0.0.1:4321';
const browser = await chromium.launch({executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',headless:true});
const results = [];
try {
  const noJs = await browser.newContext({javaScriptEnabled:false, colorScheme:'light',viewport:{width:320,height:844}});
  const plain = await noJs.newPage();
  await plain.goto(`${base}/phase-1.html`);
  assert.equal(await plain.locator('h1').isVisible(),true,'Core content must remain visible without JavaScript');
  assert.equal(await plain.getByLabel('Appearance').isDisabled(),true,'Inactive no-JS appearance control must be disabled honestly');
  await noJs.close();

  for (const width of [1440,768,390,320]) {
    for (const theme of ['light','dark']) {
      const context=await browser.newContext({viewport:{width,height:width>=768?900:844},colorScheme:'light',reducedMotion:'reduce'});
      const page=await context.newPage();
      const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      await page.goto(`${base}/phase-1.html`);
      await page.getByLabel('Appearance').selectOption(theme);
      await page.evaluate(()=>document.fonts.ready);
      // Exercise normal keyboard navigation and actual native preference control.
      await page.getByRole('link',{name:'Skip to content'}).focus();
      await page.keyboard.press('Enter');
      assert.equal(new URL(page.url()).hash,'#main','Keyboard skip link navigates to main content');
      const state=await page.evaluate(()=>({
        preference:document.documentElement.dataset.preference,
        background:getComputedStyle(document.body).backgroundColor,
        overflow:document.documentElement.scrollWidth>innerWidth,
        fonts:document.fonts.check('16px "Manrope Variable"')&&document.fonts.check('16px "Instrument Serif"'),
      }));
      assert.equal(state.preference,theme);
      assert.equal(state.background,theme==='light'?'rgb(242, 244, 234)':'rgb(32, 47, 42)');
      assert.equal(state.overflow,false,`${width}/${theme} horizontal overflow`);
      assert.equal(state.fonts,true,'Local fonts loaded');
      await page.locator('.project-figure').scrollIntoViewIfNeeded();
      await page.locator('.project-artwork img').evaluateAll(images=>Promise.all(images.map(i=>i.decode())));
      const a11y=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
      if(a11y.violations.length) console.log(JSON.stringify(a11y.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),null,2));
      assert.deepEqual(a11y.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.length})),[],`${width}/${theme} accessibility violations`);
      await page.evaluate(()=>window.scrollTo(0,0));
      await mkdir('review',{recursive:true});
      await page.screenshot({path:`review/${theme}-${width}.png`,fullPage:true});
      await page.screenshot({path:`review/${theme}-${width}-hero.png`});
      await page.reload();
      assert.equal(await page.getByLabel('Appearance').inputValue(),theme,'Preference persists on refresh');
      assert.deepEqual(errors,[],'No runtime errors');
      results.push({width,theme,...state,axeViolations:0});
      await context.close();
    }
  }
  const blocked=await browser.newContext({viewport:{width:390,height:844},colorScheme:'dark'});
  await blocked.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Storage unavailable','SecurityError')}}));
  const page=await blocked.newPage();
  await page.goto(`${base}/phase-1.html`);
  await page.getByLabel('Appearance').selectOption('light');
  assert.equal(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(242, 244, 234)','Theme works with storage denied');
  await page.getByLabel('Appearance').selectOption('system');
  assert.equal(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(32, 47, 42)','System preference follows dark device');
  await page.emulateMedia({colorScheme:'light'});
  assert.equal(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(242, 244, 234)','System preference responds to changes');
  await blocked.close();
  await writeFile('review/verification.json',JSON.stringify({results,noJavaScript:true,storageDenied:true,systemChanges:true},null,2));
  console.log(JSON.stringify({viewports:results.length,axeViolations:0,noJavaScript:true,storageDenied:true,systemChanges:true}));
} finally { await browser.close(); }
