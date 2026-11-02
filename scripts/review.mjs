import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { mkdir,writeFile,readFile } from 'node:fs/promises';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import ProjectOutcomes from '../src/components/ProjectOutcomes.ts';

const base = 'http://127.0.0.1:4321';
const output = 'review/hero-theme';
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
async function setTheme(page,theme) {
  const button=page.locator('#theme-preference');
  await page.waitForFunction(()=>!document.querySelector('#theme-preference').disabled);
  const destination='Switch to '+(theme==='dark'?'dark':'light')+' mode';
  if(await button.getAttribute('aria-label')===destination) await button.click();
  else if(await page.evaluate(()=>document.documentElement.dataset.preference)!==theme) {
    await button.click();
    await page.waitForFunction(label=>document.querySelector('#theme-preference').getAttribute('aria-label')===label,destination);
    await button.click();
  }
  await page.waitForFunction(theme=>document.documentElement.dataset.preference===theme,theme);
}
async function openMenu(page,width) {
  if(width<=650 && await page.locator('#header-menu').getAttribute('open')===null) await page.locator('#header-menu summary').click();
}
async function closeMenu(page,width) {
  if(width<=650 && await page.locator('#header-menu').getAttribute('open')!==null) {
    await page.locator('#theme-preference').press('Escape');
    assert.equal(await page.locator('#header-menu').getAttribute('open'),null,'Escape closes disclosure');
    assert.equal(await page.evaluate(()=>document.activeElement?.tagName),'SUMMARY','Escape restores focus');
  }
}
try {
  const noJs = await browser.newContext({javaScriptEnabled:false, colorScheme:'light',viewport:{width:320,height:844}});
  const plain = await noJs.newPage();
  await plain.goto(`${base}/phase-1.html`);
  assert.equal(await plain.locator('h1').isVisible(),true,'Core content must remain visible without JavaScript');
  assert.equal(await plain.locator('#theme-preference').isDisabled(),true,'Inactive no-JS appearance control must be disabled honestly');
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
      await setTheme(page,theme);
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
      assert.equal(await page.locator('select').count(),0,'No theme dropdown');
      assert.equal(await page.locator('.hero-bottom p').innerText(),'Partnering with founders and growing teams to transform complex products into intuitive experiences that drive measurable business growth.');
      assert.equal((await page.locator('.hero-actions a').allTextContents()).map(s=>s.trim()).join('|'),'View Case Studies|Book a Discovery Call');
      const heroGeometry=await page.evaluate(()=>{
        const h=document.querySelector('h1').getBoundingClientRect(),p=document.querySelector('.hero-bottom p').getBoundingClientRect(),c=document.querySelector('.hero-actions').getBoundingClientRect();
        return {headlineBottom:h.bottom,paragraphTop:p.top,paragraphRight:p.right,actionsX:c.x,actionsY:c.y,paragraphX:p.x};
      });
      assert.ok(heroGeometry.paragraphTop>heroGeometry.headlineBottom+30,'Meaningful headline-to-support gap');
      if(width>=1100)assert.ok(heroGeometry.actionsX>heroGeometry.paragraphRight,'Desktop paragraph and actions are separate columns');
      if(width<=850)assert.ok(heroGeometry.actionsY>heroGeometry.paragraphTop,'Tablet/mobile natural reading stack');
      const expectedName=theme==='light'?'Switch to dark mode':'Switch to light mode';
      assert.equal(await page.locator('#theme-preference').getAttribute('aria-label'),expectedName);
      assert.equal(await page.locator(theme==='light'?'.theme-moon':'.theme-sun').isVisible(),true,'Correct destination icon');
      if(width<=650){
        const summary=await page.locator('#header-menu summary').boundingBox(),toggle=await page.locator('#theme-preference').boundingBox();
        assert.ok(Math.abs(summary.y+summary.height/2-toggle.y-toggle.height/2)<2,'Menu and theme toggle share one mobile header row');
      }

      const baseline=JSON.parse(await readFile('content/baseline.json','utf8'));
      assert.equal((await page.locator('h1').innerText()).replace(/\s+/g,' ').trim(),baseline.heroHeadline,'Exact SEO headline');
      assert.equal(await page.locator('.project-outcomes').count(),1,'Owner-verified published results restored');
      assert.deepEqual(await page.locator('.outcome-list dt').allTextContents(),['+31%','−20%','+40%','+15%'],'Exact published values');
      assert.deepEqual(await page.locator('.outcome-label').allTextContents(),['Online sales','Bounce rate','Faster product discovery','Session duration'],'Exact published labels');
      assert.deepEqual(await page.locator('.outcome-list dd p').allTextContents(),['3 months post-launch','Homepage → category','Usability testing','Average session'],'Exact published definitions');
      assert.equal(await page.locator('.artwork-detail').count(),0,'Single dominant original screen');
      const imageBox=await page.locator('.project-artwork').boundingBox();
      assert.equal(imageBox.x,0,'Project image field starts at viewport edge');
      assert.equal(imageBox.width,width,'Project image field spans full viewport');
      assert.equal(await page.getByText(/Value pending|Sales measure|Bounce-rate measure|Discovery-time measure/).count(),0,'No private outcome placeholders');
      const pairs=await page.evaluate(()=>['body','.hero-bottom p','.text-link','.hero-role','.design-question','.proposal-label','.outcome-list dt','.outcome-attribution'].map(selector=>({selector,foreground:getComputedStyle(document.querySelector(selector)).color,background:getComputedStyle(document.body).backgroundColor})));
      const contrastPairs=pairs.map(pair=>({...pair,ratio:contrast(pair.foreground,pair.background)}));
      assert.ok(contrastPairs.every(pair=>pair.ratio>=4.5),`${width}/${theme} rendered text contrast`);
      await page.locator('.project-figure').scrollIntoViewIfNeeded();
      await page.locator('.project-artwork img').evaluateAll(images=>Promise.all(images.map(i=>i.decode())));
      const a11y=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
      if(a11y.violations.length) console.log(JSON.stringify(a11y.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),null,2));
      assert.deepEqual(a11y.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.length})),[],`${width}/${theme} accessibility violations`);
      await page.locator('.project-artwork').screenshot({path:output+'/'+theme+'-'+width+'-artwork.png'});
      await page.evaluate(()=>window.scrollTo(0,0));
      await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
      await mkdir(output,{recursive:true});
      await page.screenshot({path:`${output}/${theme}-${width}.png`,fullPage:true,animations:'disabled'});
      const artworkBox=await page.locator('.project-artwork').boundingBox();
      const artworkPixels=await sharp(output+'/'+theme+'-'+width+'.png').extract({left:0,top:Math.round(artworkBox.y+artworkBox.height*.25),width:width,height:Math.floor(artworkBox.height*.65)}).stats();
      assert.ok(artworkPixels.channels.slice(0,3).every(c=>c.stdev>20),'Full-page capture contains complete appliance imagery, not an unpainted field');
      await page.screenshot({path:output+'/'+theme+'-'+width+'-hero.png'});
      await page.reload();
      await page.waitForFunction(()=>!document.querySelector('#theme-preference').disabled);
      assert.equal(await page.evaluate(()=>document.documentElement.dataset.preference),theme,'Preference persists on refresh');
      assert.deepEqual(errors,[],'No runtime errors');
      results.push({width,theme,...state,contrastPairs,axeViolations:0});
      await context.close();
    }
  }
  const keyboard=await browser.newContext({viewport:{width:390,height:844},colorScheme:'light'});
  const keyPage=await keyboard.newPage();await keyPage.goto(base+'/phase-1.html');
  await keyPage.waitForFunction(()=>!document.querySelector('#theme-preference').disabled);
  const control=keyPage.getByRole('button',{name:'Switch to dark mode'});
  await control.focus();
  assert.notEqual(await control.evaluate(e=>getComputedStyle(e).outlineStyle),'none','Keyboard theme focus is visible');
  await keyPage.keyboard.press('Enter');
  assert.equal(await keyPage.locator('#theme-preference').getAttribute('aria-label'),'Switch to light mode','Enter changes theme and accessible name');
  await keyPage.keyboard.press('Space');
  assert.equal(await keyPage.locator('#theme-preference').getAttribute('aria-label'),'Switch to dark mode','Space changes theme');
  await openMenu(keyPage,390);await closeMenu(keyPage,390);await keyboard.close();
  const touch=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,colorScheme:'light'});
  const touchPage=await touch.newPage();await touchPage.goto(base+'/phase-1.html');
  await touchPage.waitForFunction(()=>!document.querySelector('#theme-preference').disabled);
  await touchPage.getByRole('button',{name:'Switch to dark mode'}).tap();
  assert.equal(await touchPage.locator('#theme-preference').getAttribute('aria-label'),'Switch to light mode','Touch activates theme toggle');
  const target=await touchPage.locator('#theme-preference').boundingBox();assert.ok(target.width>=48&&target.height>=48,'48px theme target');
  await touchPage.reload();await touchPage.waitForFunction(()=>!document.querySelector('#theme-preference').disabled);
  assert.equal(await touchPage.locator('#theme-preference').getAttribute('aria-label'),'Switch to light mode','Touch choice persists');
  await touch.close();
  const fixtures=await browser.newContext({viewport:{width:1440,height:900},colorScheme:'light'});
  const fixturePage=await fixtures.newPage();await fixturePage.goto(base+'/phase-1.html');
  const outcomeLayouts=[];
  for(const theme of ['light','dark']) for(const width of [1440,768,390,320]) for(const count of [1,2,3,4]) {
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
  await page.waitForFunction(()=>!document.querySelector('#theme-preference').disabled);
  assert.equal(await page.locator('#theme-preference').getAttribute('aria-label'),'Switch to light mode','System initializes dark');
  await page.emulateMedia({colorScheme:'light'});
  await page.waitForFunction(()=>document.querySelector('#theme-preference').getAttribute('aria-label')==='Switch to dark mode');
  assert.equal(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(242, 244, 234)','System follows changes before explicit choice');
  await setTheme(page,'dark');
  assert.equal(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(32, 47, 42)','Toggle works with storage denied');
  await page.emulateMedia({colorScheme:'light'});
  assert.equal(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(32, 47, 42)','Explicit selection overrides system');
  await setTheme(page,'light');
  await blocked.close();
  const stress=await browser.newContext({viewport:{width:1440,height:900},colorScheme:'light',reducedMotion:'reduce'});
  const stressPage=await stress.newPage();
  await stressPage.goto(`${base}/phase-1.html`);
  const intermediate=[];
  for(const theme of ['light','dark']) {
    for(const width of [360,480,600,650,651,820,1024,1280]) {
      await stressPage.setViewportSize({width,height:900});
      await openMenu(stressPage,width);
      await setTheme(stressPage,theme);
      const menu=await stressPage.evaluate(()=>({right:document.querySelector('.header-menu-panel').getBoundingClientRect().right,width:innerWidth}));
      assert.ok(menu.right<=menu.width+1,`${width} menu fits viewport`);
      await closeMenu(stressPage,width);
      assert.equal(await stressPage.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${width}/${theme} intermediate overflow`);
      intermediate.push({width,theme,overflow:false});
    }
  }
  await stressPage.setViewportSize({width:320,height:844});
  await stressPage.evaluate(()=>{
    const elements=[...document.querySelectorAll('h1,h2,h3,h4,p,dt,dd,a,span,button,label,summary')];
    const sizes=elements.map(e=>[e,parseFloat(getComputedStyle(e).fontSize)*2]);
    for(const [element,size] of sizes) element.style.fontSize=`${size}px`;
  });
  assert.equal(await stressPage.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'200% text-size stress at 320px fits');
  for(const theme of ['light','dark']) {
    await stressPage.evaluate(theme=>document.documentElement.dataset.preference=theme,theme);
    assert.equal(await stressPage.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'200% text-size '+theme+' reflow');
  }
  await openMenu(stressPage,320);
  assert.equal(await stressPage.locator('#theme-preference').isVisible(),true,'Menu theme remains available at enlarged text');
  await closeMenu(stressPage,320);
  await stressPage.screenshot({path:`${output}/text-200-percent-320.png`,fullPage:true});
  await stressPage.emulateMedia({forcedColors:'active'});
  await stressPage.locator('#header-menu summary').focus();
  assert.notEqual(await stressPage.locator('#header-menu summary').evaluate(e=>getComputedStyle(e).outlineStyle),'none','Forced-colors focus visible');
  await stress.close();
  await writeFile(`${output}/verification.json`,JSON.stringify({results,intermediate,outcomeLayouts,keyboardMenu:true,keyboardTheme:true,touchTheme:true,noJavaScript:true,storageDenied:true,systemChanges:true,textResize200:true,reflow320:true,forcedColorsFocus:true},null,2));
  console.log(JSON.stringify({viewports:results.length,intermediate:intermediate.length,outcomeLayouts:outcomeLayouts.length,keyboardMenu:true,keyboardTheme:true,touchTheme:true,axeViolations:0,noJavaScript:true,storageDenied:true,systemChanges:true,textResize200:true,reflow320:true,forcedColorsFocus:true}));
} finally { await browser.close(); }
