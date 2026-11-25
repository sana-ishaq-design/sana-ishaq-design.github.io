/** Fit gating only: scrolling itself is entirely native CSS sticky. */
export function setupJourney() {
 const stack=document.querySelector<HTMLElement>('.layered-journey .ridge-stack');
 if(!stack)return;
 const panels=[...stack.querySelectorAll<HTMLElement>('.ridge-panel')];
 const header=document.querySelector<HTMLElement>('.full-header');
 const measure=()=>{
  const available=innerHeight-(header?.getBoundingClientRect().height||128)-16-40-24;
  stack.dataset.stackFit=String(panels.every(panel=>panel.getBoundingClientRect().height<=available));
 };
 const observer=new ResizeObserver(measure);
 panels.forEach(panel=>observer.observe(panel));if(header)observer.observe(header);
 window.addEventListener('resize',measure,{passive:true});measure();
 // :focus-visible switches every panel to document flow before revealing focus.
 stack.addEventListener('focusin',event=>{
  const target=event.target;
  if(target instanceof HTMLElement && target.matches(':focus-visible'))
   requestAnimationFrame(()=>target.scrollIntoView({block:'center',behavior:'instant'}));
 });
}
