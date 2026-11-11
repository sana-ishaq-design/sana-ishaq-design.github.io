import {chromium} from 'playwright';
import {createServer} from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const luminance=rgb=>rgb.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
const external=process.env.PREVIEW_URL,root=resolve('dist-preview');
const server=external?null:createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://local').pathname);if(!pathname.startsWith('/portfolio-preview/'))throw Error();const file=resolve(root,pathname.slice(19)||'index.html');if(!file.startsWith(root))throw Error();res.setHeader('Content-Type',({'.svg':'image/svg+xml','.html':'text/html','.css':'text/css','.js':'application/javascript','.woff2':'font/woff2','.webp':'image/webp'})[extname(file)]||'application/octet-stream');res.end(await readFile(file))}catch{res.statusCode=404;res.end()}});
if(server)await new Promise(r=>server.listen(4398,'127.0.0.1',r));
const url=external||'http://127.0.0.1:4398/portfolio-preview/';
const out='review/hero-atmosphere/'+(external?'public':'local');await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'});const results=[];
try{for(const width of [1440,1024,768,390,320])for(const theme of ['light','dark'])for(const motion of ['no-preference','reduce']){
 const c=await browser.newContext({viewport:{width,height:1100},reducedMotion:motion});await c.addInitScript(t=>localStorage.setItem('portfolio-review-theme',t),theme);const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(url);await p.locator('.theme-toggle:not([disabled])').waitFor();await p.evaluate(()=>document.fonts.ready);
 await p.evaluate(async()=>{const background=getComputedStyle(document.querySelector('.hero-terrain')).backgroundImage;const url=background.match(/^url\(["']?(.*?)["']?\)$/)?.[1];if(!url)throw Error('Missing mountain artwork');const artwork=new Image();artwork.src=url;await artwork.decode();if(!artwork.naturalWidth)throw Error('Mountain artwork failed to load')});
 const state=await p.evaluate(()=>{const layer=document.querySelector('.hero-atmosphere'),mist=document.querySelector('.hero-mist'),terrain=document.querySelector('.hero-terrain'),grain=document.querySelector('.hero-grain');const anim=mist.getAnimations()[0];let midpoint=null;if(anim){anim.pause();anim.currentTime=18000;midpoint={transform:getComputedStyle(mist).transform,opacity:Number(getComputedStyle(mist).opacity)};anim.currentTime=0}const rect=document.querySelector('.hero').getBoundingClientRect();layer.style.display='none';const hidden=document.querySelector('.hero').getBoundingClientRect();layer.style.removeProperty('display');return {hidden:layer.getAttribute('aria-hidden'),pointer:getComputedStyle(layer).pointerEvents,overflow:document.documentElement.scrollWidth>innerWidth,terrainAnimations:terrain.getAnimations({subtree:true}).length,grainAnimations:grain.getAnimations().length,mistAnimations:mist.getAnimations().length,duration:anim?.effect.getTiming().duration,midpoint,layoutStable:rect.height===hidden.height&&rect.y===hidden.y}});
 assert.equal(state.hidden,'true');assert.equal(state.pointer,'none');assert.equal(state.overflow,false);assert.equal(state.layoutStable,true);assert.equal(state.terrainAnimations,0);assert.equal(state.grainAnimations,0);assert.deepEqual(errors,[]);
 if(width>900&&motion==='no-preference'){assert.equal(state.mistAnimations,1);assert.equal(state.duration,36000);assert.equal(state.midpoint.transform,'matrix(1, 0, 0, 1, 6, 0)');assert.equal(state.midpoint.opacity,.15)}else assert.equal(state.mistAnimations,0);
 if([1440,390].includes(width)&&motion==='no-preference')await p.screenshot({path:out+'/'+width+'-'+theme+'.png'});
 // Keyboard and pointer feedback must agree without moving link boxes.
 const links=p.locator('.hero-actions a');assert.equal(await links.count(),2);
 const stablePlacement=await p.evaluate(()=>{const group=document.querySelector('.hero-actions'),hero=document.querySelector('.hero'),terrain=document.querySelector('.hero-atmosphere');const before=[hero.getBoundingClientRect().height,terrain.getBoundingClientRect().y];group.style.gap=innerWidth<=650?'8px':'12px';group.style.paddingBottom='0px';const baseline=[hero.getBoundingClientRect().height,terrain.getBoundingClientRect().y];group.style.removeProperty('gap');group.style.removeProperty('padding-bottom');return before.every((v,i)=>v===baseline[i])});assert.equal(stablePlacement,true);
 const gap=await p.locator('.hero-actions').evaluate(e=>getComputedStyle(e).rowGap);assert.equal(gap,'6px');
 await links.first().focus();await p.keyboard.press('Tab');
 for(const index of [1,0]){if(index===0)await p.keyboard.press('Shift+Tab');await p.waitForTimeout(220);
 const focus=await links.nth(index).evaluate(e=>({active:e===document.activeElement,visible:e.matches(':focus-visible'),outline:getComputedStyle(e).outlineWidth,arrow:getComputedStyle(e.querySelector('svg')).transform,underline:getComputedStyle(e).textUnderlineOffset}));
 assert.equal(focus.active,true);assert.equal(focus.visible,true);assert.equal(focus.outline,'3px');
 const expected=motion==='reduce'?'none':index===0?'matrix(1, 0, 0, 1, 0, 3)':'matrix(1, 0, 0, 1, 2.5, -2.5)';assert.equal(focus.arrow,expected);assert.equal(focus.underline,motion==='reduce'?'7px':'9px');
 await links.nth(index).hover();await p.waitForTimeout(220);assert.equal(await links.nth(index).locator('svg').evaluate(e=>getComputedStyle(e).transform),expected);
 }
 await p.mouse.move(0,0);await p.evaluate(()=>document.activeElement.blur());
 // Sample the actual composited decorative background, not just the base token.
 const textAreas=await p.locator('.hero-role,h1,h1 em,.hero-bottom>p,.hero-actions a').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,color:s.color.match(/[\d.]+/g).slice(0,3).map(Number),threshold:parseFloat(s.fontSize)>=24?3:4.5}}));
 await p.evaluate(()=>document.querySelectorAll('.hero-heading,.hero-bottom').forEach(e=>e.style.visibility='hidden'));
 let minimum=100;state.contrastFrames=[];
 for(const time of state.mistAnimations?[0,9000,18000,27000,36000]:[0]){
 await p.evaluate(t=>{const a=document.querySelector('.hero-mist').getAnimations()[0];if(a){a.pause();a.currentTime=t}},time);
 const pixels=await sharp(await p.screenshot()).removeAlpha().raw().toBuffer({resolveWithObject:true});
 for(const area of textAreas){const foreground=luminance(area.color);let worst=100;for(let y=Math.max(0,Math.ceil(area.y));y<Math.min(pixels.info.height,area.bottom);y+=2)for(let x=Math.max(0,Math.ceil(area.x));x<Math.min(pixels.info.width,area.right);x+=2){const offset=(y*pixels.info.width+x)*3,background=luminance([...pixels.data.subarray(offset,offset+3)]);worst=Math.min(worst,(Math.max(foreground,background)+.05)/(Math.min(foreground,background)+.05))}assert.ok(worst>=area.threshold,`${width} ${theme} actual backdrop contrast ${worst} < ${area.threshold}`);minimum=Math.min(minimum,worst)}
 state.contrastFrames.push(time);}
 state.minimumSampledContrast=minimum;
 results.push({width,theme,motion,...state});await c.close();
}await writeFile(out+'/results.json',JSON.stringify(results,null,2));console.log('PASS 20 motion/theme/viewport states: stationary terrain and grain, mist-only 6px/36s, mobile/reduced-motion static, no layout change or overflow.');}finally{await browser.close();if(server)server.close()}
