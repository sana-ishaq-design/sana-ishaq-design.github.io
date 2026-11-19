import fragment from './volume.frag?raw';
import NoiseWorker from './noise.worker?worker';
type Metrics={mode:string;frames:number;startupMs:number;cpuMs:number[];gpuMs:number[];intervalMs:number[];quality:number;canvas:number[];error?:string};
declare global {interface Window {atmosphereMetrics:Metrics}}
export function startAtmosphere(){
 // Keep fixed review controls outside the hero's isolated stacking context.
 document.body.append(document.querySelector('.atmosphere-controls')!);
 const canvas=document.querySelector<HTMLCanvasElement>('#cloud-volume')!,hero=document.querySelector<HTMLElement>('.hero')!,status=document.querySelector<HTMLElement>('#cloud-status')!;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)'),mobile=matchMedia('(max-width:900px)'),forced=matchMedia('(forced-colors:active)');
 const stats:Metrics=window.atmosphereMetrics={mode:'static',frames:0,startupMs:0,cpuMs:[],gpuMs:[],intervalMs:[],quality:.5,canvas:[]};
 const settings={density:1.2,speed:1,light:1,depth:1};
 const pause=document.querySelector<HTMLButtonElement>('#cloud-pause')!;
 let gl:WebGL2RenderingContext|null=null,program:WebGLProgram|null=null,worker:Worker|null=null,texture:WebGLTexture|null=null,vao:WebGLVertexArrayObject|null=null;
 let visible=true,paused=false,ready=false,failed=false,raf=0,time=0,last=0,lastDraw=0,started=0,query:WebGLQuery|null=null;
 const uniforms:Record<string,WebGLUniformLocation|null>={};
 // Timer extension is optional; no synchronous readback in the animation loop.
 let timer:{TIME_ELAPSED_EXT:number;GPU_DISJOINT_EXT:number}|null=null;
 const remember=(a:number[],n:number)=>{a.push(n);if(a.length>600)a.shift();};
 const dark=()=>document.documentElement.dataset.preference==='dark'||(document.documentElement.dataset.preference!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches);
 const eligible=()=>!reduced.matches&&!mobile.matches&&!forced.matches&&!failed;
 function size(){if(!gl)return;const r=canvas.getBoundingClientRect();const scale=Math.min(stats.quality,Math.sqrt(350000/Math.max(1,r.width*r.height)));canvas.width=Math.max(1,Math.round(r.width*scale));canvas.height=Math.max(1,Math.round(r.height*scale));stats.canvas=[canvas.width,canvas.height];gl.viewport(0,0,canvas.width,canvas.height);}
 function stop(){cancelAnimationFrame(raf);raf=0;last=lastDraw=0;}
 function fallback(reason:string){failed=true;ready=false;stop();worker?.terminate();worker=null;document.body.classList.remove('volume-ready');stats.mode='fallback';stats.error=reason;status.textContent='Static fallback: '+reason;}
 function compile(type:number,source:string){const shader=gl!.createShader(type)!;gl!.shaderSource(shader,source);gl!.compileShader(shader);if(!gl!.getShaderParameter(shader,gl!.COMPILE_STATUS))throw Error(gl!.getShaderInfoLog(shader)||'Shader compilation failed');return shader;}
 function draw(){if(!gl||!program||!ready)return;
  const before=performance.now();gl.useProgram(program);gl.bindVertexArray(vao);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_3D,texture);
  if(query&&gl.getQueryParameter(query,gl.QUERY_RESULT_AVAILABLE)){if(!gl.getParameter(timer!.GPU_DISJOINT_EXT))remember(stats.gpuMs,gl.getQueryParameter(query,gl.QUERY_RESULT)/1e6);gl.deleteQuery(query);query=null;}
  let timed=false;if(timer&&!query){query=gl.createQuery();gl.beginQuery(timer.TIME_ELAPSED_EXT,query!);timed=true;}
  gl.uniform1i(uniforms.uNoise,0);gl.uniform2f(uniforms.uResolution,canvas.width,canvas.height);gl.uniform1f(uniforms.uTime,time);gl.uniform1f(uniforms.uDark,dark()?1:0);
  gl.uniform1f(uniforms.uDensity,settings.density);gl.uniform1f(uniforms.uLight,settings.light);gl.uniform1f(uniforms.uDepth,settings.depth);gl.uniform1i(uniforms.uSteps,stats.quality<.4?24:36);
  gl.drawArrays(gl.TRIANGLES,0,3);if(timed)gl.endQuery(timer!.TIME_ELAPSED_EXT);
  stats.frames++;remember(stats.cpuMs,performance.now()-before);
 }
 function tick(now:number){raf=0;if(!ready||!eligible()||!visible||document.hidden||paused)return;
  if(!last)last=now;const delta=Math.min((now-last)/1000,.1);last=now;time+=delta*settings.speed;
  if(!lastDraw||now-lastDraw>=32){if(lastDraw)remember(stats.intervalMs,now-lastDraw);lastDraw=now;draw();
   if(stats.frames%90===0){const gpu=stats.gpuMs.slice(-30),mean=gpu.length?gpu.reduce((a,b)=>a+b)/gpu.length:0;const intervals=stats.intervalMs.slice(-30);const slow=intervals.filter(n=>n>55).length>10;
    if((mean>14||slow)&&stats.quality>.26){stats.quality=Math.max(.25,stats.quality-.1);size();}
   }
  }raf=requestAnimationFrame(tick);
 }
 function update(){
  stop();if(!eligible()){document.body.classList.remove('volume-ready');stats.mode=failed?'fallback':'static';status.textContent=failed?'Static fallback: '+stats.error:'Static fallback — mobile, reduced motion or forced colors.';return;}
  if(!gl&&!worker&&!failed){init();return;}
  if(!ready)return;document.body.classList.add('volume-ready');draw();
  stats.mode=paused?'paused':(!visible||document.hidden?'suspended':'animated');status.textContent=stats.mode==='animated'?'Live volumetric mist · adaptive quality · maximum 30 fps':stats.mode==='paused'?'Atmosphere paused.':'Rendering suspended while offscreen.';
  if(stats.mode==='animated')raf=requestAnimationFrame(tick);
 }
 function init(){started=performance.now();status.textContent='Preparing volume; original mountain fallback remains visible.';
  try{gl=canvas.getContext('webgl2',{alpha:true,premultipliedAlpha:true,antialias:false,depth:false,powerPreference:'low-power'});if(!gl)throw Error('WebGL2 unavailable');
   const vertex=compile(gl.VERTEX_SHADER,'#version 300 es\nvoid main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}');
   const frag=compile(gl.FRAGMENT_SHADER,fragment);program=gl.createProgram()!;gl.attachShader(program,vertex);gl.attachShader(program,frag);gl.linkProgram(program);gl.deleteShader(vertex);gl.deleteShader(frag);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program)||'Shader link failed');
   for(const name of ['uNoise','uResolution','uTime','uDensity','uLight','uDepth','uDark','uSteps'])uniforms[name]=gl.getUniformLocation(program,name);
   timer=gl.getExtension('EXT_disjoint_timer_query_webgl2');vao=gl.createVertexArray();gl.bindVertexArray(vao);size();
   worker=new NoiseWorker();worker.onerror=()=>fallback('Noise worker could not initialize');worker.onmessage=({data})=>{if(!gl||failed)return;texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_3D,texture);gl.texImage3D(gl.TEXTURE_3D,0,gl.R8,data.size,data.size,data.size,0,gl.RED,gl.UNSIGNED_BYTE,data.data);for(const axis of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T,gl.TEXTURE_WRAP_R])gl.texParameteri(gl.TEXTURE_3D,axis,gl.REPEAT);gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);worker?.terminate();worker=null;ready=true;stats.startupMs=performance.now()-started;update();};
  }catch(e){fallback(String(e));}
 }
 for(const key of ['density','speed','light','depth'] as const){const input=document.querySelector<HTMLInputElement>('#cloud-'+key)!;input.addEventListener('input',()=>{settings[key]=Number(input.value);input.nextElementSibling!.textContent=input.value;if(paused)draw();});}
 pause.addEventListener('click',()=>{paused=!paused;pause.setAttribute('aria-pressed',String(paused));pause.textContent=paused?'Resume atmosphere':'Pause atmosphere';update();});
 document.querySelector('#cloud-reset')!.addEventListener('click',()=>{for(const key of ['density','speed','light','depth'] as const){settings[key]=key==='density'?1.2:1;const input=document.querySelector<HTMLInputElement>('#cloud-'+key)!;input.value=String(settings[key]);input.nextElementSibling!.textContent=input.value;}draw();});
 const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update();});observer.observe(hero);
 const resize=new ResizeObserver(()=>{size();if(ready)draw();});resize.observe(canvas);
 new MutationObserver(()=>{if(ready)draw();}).observe(document.documentElement,{attributes:true,attributeFilter:['data-preference']});
 for(const media of [reduced,mobile,forced])media.addEventListener('change',update);
 matchMedia('(prefers-color-scheme:dark)').addEventListener('change',()=>{if(ready)draw();});
 document.addEventListener('visibilitychange',update);
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();fallback('Graphics context lost; reload to retry.');});
 window.addEventListener('pagehide',()=>{stop();worker?.terminate();observer.disconnect();resize.disconnect();if(gl){if(query)gl.deleteQuery(query);gl.deleteTexture(texture);gl.deleteProgram(program);gl.deleteVertexArray(vao);}} ,{once:true});
 update();
}
