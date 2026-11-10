import projects from './collection-projects.json';
import {collectionView,collectionPath,publishedProjects} from '../lib/collection-state.mjs';
import {haiermallOutcomes,haiermallAttribution} from './haiermall';
import source from '../../case-studies.html?raw';
const clean=source.replace(/<!--[\s\S]*?-->/g,'');
function block(html:string,start:number){let depth=0;const tags=/<\/?div\b[^>]*>/g;tags.lastIndex=start;let m;while((m=tags.exec(html))){depth+=m[0].startsWith('</')?-1:1;if(!depth)return html.slice(start,tags.lastIndex)}throw new Error('Collection source block unbalanced')}
function replaceBlock(html:string,cls:string,replacement:string){const start=html.indexOf(`<div class="${cls}"`);if(start<0)throw new Error(`Missing collection block ${cls}`);return html.replace(block(html,start),replacement)}
const facts=(pairs:string[][])=>`<dl class="collection-facts">${pairs.map(([label,value])=>`<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl>`;
const evidence=(pairs:string[][],note:string)=>`<dl class="collection-evidence">${pairs.map(([value,label])=>`<div><dt>${value}</dt><dd>${label}</dd></div>`).join('')}</dl><p class="evidence-note">${note}</p>`;
const arrow='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>';
function image(html:string,name:string,alt:string,w:number,h:number,eager=false){
 const responsive=w<400?'':`srcset="/review-images/collection-${name}-400.webp 400w, /review-images/collection-${name}-800.webp 800w" sizes="(max-width:700px) 100vw, 50vw"`;
 return html.replace(/<img[\s\S]*?>/,`<img src="/review-images/collection-${name}-800.webp" ${responsive} width="${w}" height="${h}" alt="${alt}" loading="${eager?'eager':'lazy'}" decoding="async" />`);
}
function finish(html:string,id:string,title:string){return html.replace(/^<div /,`<article id="${id}" aria-label="${title}" `).replace(/<\/div>$/,'</article>').replace(/ target="_blank"/g,'').replace(/<a([^>]*class="cta-link"[^>]*)>[\s\S]*?<\/a>/,`<a$1>Read ${title} case study ${arrow}</a>`)}
const haier=projects.find(p=>p.id==='haiermall')!;
const escapeHtml=(s:string)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
let featured=block(clean,clean.indexOf('<div class="featured-card"'));
featured=featured.replace(/<h2 class="feat-title">[\s\S]*?<\/h2>/,`<h2 class="feat-title">${escapeHtml(haier.title)}</h2><p class="collection-summary">${escapeHtml(haier.subtitle||'')}</p>`);
featured=featured.replace(/<p class="feat-desc">[\s\S]*?<\/p>/,`<p class="feat-desc">${escapeHtml(haier.description)}</p>`);
featured=replaceBlock(featured,'feat-metrics-row',evidence(haiermallOutcomes.slice(0,3).map(o=>[o.value,`${o.label} · ${o.context}`]),haiermallAttribution.text));
featured=replaceBlock(featured,'proj-meta',facts([['Role',escapeHtml(haier.role)]]));
export const featuredHtml=finish(image(featured,haier.thumbnail.name,escapeHtml(haier.thumbnail.alt),haier.thumbnail.width,haier.thumbnail.height,true),haier.id,escapeHtml(haier.title));
let head=source.slice(source.indexOf('<title>'),source.indexOf('</script>',source.indexOf('<script type="application/ld+json">'))+9);
head=head.replace('Includes work that drove +31% sales, cut bounce rates by 20%, and reached 100K+ downloads.','Includes verified HaierMall results of +31% sales and −20% bounce rate, plus a car subscription product with a published 100K+ download milestone.').replace('Case studies showing exactly how UX and product design decisions drove +31% sales, cut bounce rates, and launched apps to 100K+ users. SaaS, e-commerce, mobile, and enterprise.','Explore SaaS, e-commerce, mobile and enterprise case studies. Verified HaierMall results and a published Subscribe Me download milestone are presented with project context and individual contributions.');
export function collectionMetadata(page=1){
 const view=collectionView(projects,'all',page);const path=collectionPath(view.page);
 const jsonMatch=head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)!;
 const schema=JSON.parse(jsonMatch[1]);schema.url='https://sana-ishaq-design.github.io'+path;
 schema.mainEntity.itemListElement=view.items.map((p:{title:string;url:string},i:number)=>({'@type':'ListItem',position:(view.page-1)*4+i+1,name:p.title,url:'https://sana-ishaq-design.github.io'+p.url}));
 schema.mainEntity.numberOfItems=publishedProjects(projects).length;
 let output=head.replace(jsonMatch[0],`<script type="application/ld+json">${JSON.stringify(schema)}</script>`);
 if(page>1)output=output.replaceAll('https://sana-ishaq-design.github.io/case-studies.html','https://sana-ishaq-design.github.io'+path).replace('<title>UI/UX Case Studies','<title>UI/UX Case Studies — Page '+page);
 return output;
}
