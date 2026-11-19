export async function revealHeadline(){
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');if(reduced.matches)return;
 await Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,700))]);
 const title=document.querySelector<HTMLElement>('#hero-title');if(!title||scrollY>100)return;
 const box=title.getBoundingClientRect(),walker=document.createTreeWalker(title,NodeFilter.SHOW_TEXT),bottoms:number[]=[];
 let node:Node|null;while((node=walker.nextNode())){const range=document.createRange();range.selectNodeContents(node);for(const r of range.getClientRects())if(r.width>2&&!bottoms.some(b=>Math.abs(b-r.bottom)<8))bottoms.push(r.bottom);}
 bottoms.sort((a,b)=>a-b);
 const frames:Keyframe[]=[{clipPath:'inset(0 0 100% 0)',offset:0}];
 bottoms.forEach((b,i)=>frames.push({clipPath:`inset(0 0 ${Math.max(0,100-(b-box.top+8)/box.height*100)}% 0)`,offset:(i+1)/bottoms.length}));
 frames[frames.length-1].clipPath='inset(0 0 0 0)';
 const animations=[title.animate(frames,{duration:Math.min(1100,bottoms.length*250),easing:'ease-out'})];
 for(const [i,e] of [...document.querySelectorAll<HTMLElement>('.hero-bottom>p,.hero-actions')].entries())animations.push(e.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:450,delay:650+i*140,fill:'backwards',easing:'ease-out'}));
 const cancel=()=>animations.forEach(a=>a.cancel());window.addEventListener('resize',cancel,{once:true});document.addEventListener('focusin',cancel,{once:true});reduced.addEventListener('change',cancel,{once:true});
}
