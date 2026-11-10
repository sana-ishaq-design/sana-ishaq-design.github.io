export const PAGE_SIZE=4;
export const categories=[['all','All Work'],['ecommerce','E-commerce'],['saas-enterprise','SaaS & Enterprise'],['mobile','Mobile Apps'],['websites','Websites & Landing Pages'],['ux-audits','UX Audits'],['design-systems','Design Systems']];
export function publishedProjects(projects){
 const seen=new Set();for(const project of projects){if(seen.has(project.id))throw new Error(`Duplicate collection ID: ${project.id}`);seen.add(project.id)}
 return projects.filter(p=>p.published===true).sort((a,b)=>Number(b.id==='haiermall'&&b.featured)-Number(a.id==='haiermall'&&a.featured)||a.order-b.order||a.id.localeCompare(b.id));
}
export function availableCategories(projects){const live=publishedProjects(projects);return categories.filter(([id])=>id==='all'||live.some(p=>p.categories.includes(id)))}
export function collectionView(projects,category='all',requestedPage=1){
 const active=categories.some(([id])=>id===category)?category:'all';
 const matched=publishedProjects(projects).filter(p=>active==='all'||p.categories.includes(active));
 const totalPages=Math.max(1,Math.ceil(matched.length/PAGE_SIZE));
 const parsed=Number(requestedPage);const page=Number.isInteger(parsed)?Math.max(1,Math.min(totalPages,parsed)):1;
 const items=matched.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE);
 const featured=active==='all'&&page===1?items.find(p=>p.id==='haiermall'&&p.featured):undefined;
 return {category:active,page,totalPages,total:matched.length,items,featured,cards:items.filter(p=>p!==featured)};
}
export function collectionPath(page=1){return page>1?`/case-studies/page/${page}.html`:'/case-studies.html'}
export function collectionHref(page=1,category='all'){return collectionPath(page)+(category==='all'?'':`?category=${encodeURIComponent(category)}`)}
export function stateFromUrl(url){const parsed=new URL(url,'https://local.invalid');const page=Number(parsed.pathname.match(/\/case-studies\/page\/(\d+)\.html$/)?.[1]??parsed.searchParams.get('page')??1);return {category:parsed.searchParams.get('category')||'all',page}}
export function paginationPages(page,total){const values=new Set([1,total,page-1,page,page+1]);return [...values].filter(n=>n>=1&&n<=total).sort((a,b)=>a-b)}
