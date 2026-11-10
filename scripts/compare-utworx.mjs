import {chromium} from 'playwright';

import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import {resolve,extname} from 'node:path';
const root=resolve('dist');
const server=createServer(async(req,res)=>{try{const file=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root))throw Error();const bytes=await readFile(file);res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'application/javascript','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2'})[extname(file)]||'application/octet-stream');res.end(bytes)}catch{res.statusCode=404;res.end('Not found')}});
await new Promise(r=>server.listen(4388,'127.0.0.1',r));
import sharp from 'sharp';
const dir='review/utworx-final-comparison';await mkdir(dir,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'});
const metrics=[];
const projects=[['haiermall','haiermall-case-study',['#purchase-journey','.story-screen','#whats-next']],['subscribe','subscribe-me-case-study',['#journey','.car-value-art','.car-ending']],['utworx','utworx-case-study',['#dashboard','#workorders .ut-work-pair','.ut-ending']]];
try{for(const width of [1440,390])for(const theme of ['light','dark']){
 const ctx=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});await ctx.addInitScript(t=>localStorage.setItem('portfolio-review-theme',t),theme);
 for(const [name,route,selectors] of projects){const page=await ctx.newPage();await page.goto('http://127.0.0.1:4388/case-studies/'+route+'.html');await page.evaluate(()=>document.fonts.ready);
 const capture=async(label,selector)=>{if(selector){await page.locator(selector).first().evaluate(e=>window.scrollTo(0,e.getBoundingClientRect().top+scrollY-(parseFloat(getComputedStyle(document.body).getPropertyValue('--case-chapter-offset'))||0)-24));}else await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(150);await page.screenshot({path:`${dir}/${name}-${width}-${theme}-${label}.png`});};
 await capture('opening');for(let i=0;i<selectors.length;i++)await capture(['chapter','screens','ending'][i],selectors[i]);
 if(name==='utworx'){for(const id of ['challenge','maintenance','reporting','impact','decisions','learnings','reflection'])await capture(id,'#'+id);await capture('modal','#maintenance .ut-maintenance-details');await capture('hero-image','#overview .ut-screen');}
 metrics.push({name,width,theme,...await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,headingFont:getComputedStyle(document.querySelector('h1')).fontFamily,bodyFont:getComputedStyle(document.body).fontFamily,headerHeight:document.querySelector('.full-header').getBoundingClientRect().height,canvas:getComputedStyle(document.body).backgroundColor}))});await page.close();}
 await ctx.close();
 for(const part of ['opening','chapter','screens','ending']){const inputs=[];for(let i=0;i<projects.length;i++)inputs.push({input:await sharp(`${dir}/${projects[i][0]}-${width}-${theme}-${part}.png`).resize({width:width===1440?480:390}).toBuffer(),left:i*(width===1440?480:390),top:0});await sharp({create:{width:width===1440?1440:1170,height:width===1440?334:1000,channels:3,background:'#ffffff'}}).composite(inputs).png().toFile(`${dir}/compare-${width}-${theme}-${part}.png`);}
}
await writeFile(`${dir}/comparison.json`,JSON.stringify(metrics,null,2));console.log(JSON.stringify(metrics,null,2));
}finally{await browser.close();server.close()}

