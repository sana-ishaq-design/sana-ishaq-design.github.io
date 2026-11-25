import {chromium} from 'playwright';
import {createServer} from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
const remote=process.env.PREVIEW_URL,root=resolve('dist-preview'),folder='review/layered-work/'+(remote?'public':'local');await mkdir(folder,{recursive:true});
const server=remote?null:createServer(async(req,res)=>{try{const file=resolve(root,new URL(req.url,'http://local').pathname.slice(19)||'index.html');if(!file.startsWith(root))throw Error();res.setHeader('Content-Type',({'.svg':'image/svg+xml','.html':'text/html','.js':'application/javascript','.css':'text/css','.woff2':'font/woff2'})[extname(file)]||'application/octet-stream');res.end(await readFile(file))}catch{res.statusCode=404;res.end()}});if(server)await new Promise(r=>server.listen(4409,'127.0.0.1',r));
const base=remote||'http://127.0.0.1:4409/portfolio-preview/';const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'});
try{for(const theme of ['light','dark']){
 const c=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,recordVideo:{dir:folder+'/raw-video',size:{width:1440,height:1000}}});
 await c.addInitScript(t=>{localStorage.setItem('portfolio-review-theme',t);window.journeyPerformance={shifts:[],tasks:[],frames:[]};new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.journeyPerformance.shifts.push({start:e.startTime,value:e.value})}).observe({type:'layout-shift',buffered:true});new PerformanceObserver(list=>{for(const e of list.getEntries())window.journeyPerformance.tasks.push({start:e.startTime,duration:e.duration})}).observe({type:'longtask',buffered:true});},theme);
 const p=await c.newPage(),epoch=Date.now();await p.goto(base+'layered-work.html');await p.evaluate(()=>document.fonts.ready);await p.waitForFunction(()=>document.body.classList.contains('volume-ready'));await p.waitForTimeout(2000);
 const start=Date.now();const positions=await p.locator('.ridge-panel').evaluateAll(es=>es.map((e,i)=>e.getBoundingClientRect().top+scrollY-144-i*20));
 const startPerf=await p.evaluate(()=>{window.recordFrames=true;let last=performance.now();const frame=now=>{window.journeyPerformance.frames.push(now-last);last=now;if(window.recordFrames)requestAnimationFrame(frame)};requestAnimationFrame(frame);return performance.now()});
 await p.mouse.move(1400,900);await p.waitForTimeout(2000);
 async function scrollTo(target,steps=30){const from=await p.evaluate(()=>scrollY),delta=(target-from)/steps;for(let i=0;i<steps;i++){await p.mouse.wheel(0,delta);await p.waitForTimeout(100);}}
 for(const target of positions){await scrollTo(target,30);await p.waitForTimeout(1700);}
 await scrollTo(positions[2]+850,30);await p.waitForTimeout(1000);await scrollTo(positions[1]-200,45);await p.waitForTimeout(1500);
 const end=Date.now(),metrics=await p.evaluate(start=>{window.recordFrames=false;const m=window.atmosphereMetrics,j=window.journeyPerformance;const percentile=(a,p)=>a.length?[...a].sort((x,y)=>x-y)[Math.floor((a.length-1)*p)]:null;return{zoom:visualViewport.scale,cls:j.shifts.reduce((a,b)=>a+b.value,0),scrollCls:j.shifts.filter(e=>e.start>=start).reduce((a,b)=>a+b.value,0),scrollFrameP95Ms:percentile(j.frames,.95),longTasks:j.tasks.filter(e=>e.start>=start),atmosphere:{frames:m.frames,canvas:m.canvas,cpuP95Ms:percentile(m.cpuMs,.95),gpuP95Ms:percentile(m.gpuMs,.95),quality:m.quality,mode:m.mode}}},startPerf);
 const video=p.video();await c.close();const raw=await video.path();await writeFile(`${folder}/recording-${theme}.json`,JSON.stringify({theme,raw,trimStart:(start-epoch)/1000,duration:(end-start)/1000,...metrics},null,2));console.log({theme,raw,duration:(end-start)/1000,...metrics});
}}finally{await browser.close();server?.close()}
