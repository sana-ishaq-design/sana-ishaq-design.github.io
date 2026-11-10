import original from '../../case-studies/haiermall-case-study.html?raw';
// Immutable published prose, extracted at build time. Fail if the source shape changes.
const clean=(s:string)=>s.replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
function passages(className:string,count:number){
 const values=[...original.matchAll(new RegExp(`<div class="${className}">([\\s\\S]*?)<\\/div>`,'g'))].map(m=>clean(m[1]));
 if(values.length!==count)throw new Error(`HaierMall source mismatch: ${className}`);
 return values;
}
export const metadata=original.slice(original.indexOf('<title>'),original.indexOf('</script>',original.indexOf('<script type="application/ld+json">'))+9);
export const context=clean(original.match(/<p class="hero-sub">([\s\S]*?)<\/p>/)![1]);
const auditTitles=passages('audit-title',6),auditBodies=passages('audit-body',6);
export const findings=auditTitles.map((title,i)=>({title,body:auditBodies[i]}));
const decisionTitles=passages('dec-title',6),decisionBodies=passages('dec-desc',6);
export const decisions=decisionTitles.map((title,i)=>({title,body:decisionBodies[i]}));
const learningTitles=passages('learning-title',4),learningBodies=passages('learning-text',4);
export const learnings=learningTitles.map((title,i)=>({title,body:learningBodies[i]}));
export const callouts=[...original.matchAll(/class="callout-text"\s*>([\s\S]*?)<\/span>/g)].map(m=>clean(m[1]));
if(callouts.length!==5)throw new Error('HaierMall source: expected five hierarchy callouts');
const comparison=[...original.matchAll(/<div class="ba-row[^\"]*">([\s\S]*?)<\/div>/g)].map(m=>clean(m[1].replace(/<span[\s\S]*?<\/span>/g,'')));
if(comparison.length!==12)throw new Error('HaierMall source: expected twelve comparison entries');
export const before=comparison.slice(0,6),after=comparison.slice(6);
export const findingLinks=[
 {id:'brand-and-orientation',label:'Brand recognition and orientation'},
 {id:'brand-and-orientation',label:'Weighted navigation and hierarchy'},
 {id:'purchase-confidence',label:'The purchase decision sequence'},
 {id:'checkout-continuity',label:'Continuity through checkout'},
 {id:'product-discovery',label:'Product evaluation on mobile'},
];
