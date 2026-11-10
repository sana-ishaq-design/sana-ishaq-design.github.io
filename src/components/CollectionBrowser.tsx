import {useEffect,useRef,useState} from 'react';
import type {CollectionProject} from '../content/collection-types';
import {availableCategories,categories,collectionView,collectionHref,collectionPath,paginationPages,stateFromUrl} from '../lib/collection-state.mjs';
const Arrow=()=> <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>;
function Card({project}:{project:CollectionProject}){
 const p=project,t=p.thumbnail;
 return <article id={p.id} className="collection-card" aria-labelledby={`${p.id}-title`}>
  <div className={`collection-thumbnail collection-thumbnail-${t.name}`}><img src={`/review-images/collection-${t.name}-800.webp`} srcSet={t.width<400?undefined:`/review-images/collection-${t.name}-400.webp 400w, /review-images/collection-${t.name}-800.webp 800w`} sizes="(max-width:700px) 100vw, 50vw" width={t.width} height={t.height} alt={t.alt} loading="lazy" decoding="async" /></div>
  <h2 id={`${p.id}-title`}>{p.title}</h2><p className="collection-card-category">{p.label}</p>
  <p className="collection-card-description">{p.description}</p><p className="collection-card-role">{p.role}</p>
  {p.highlight&&<p className="collection-card-highlight"><strong>{p.highlight}</strong>{p.highlightContext&&<span>{p.highlightContext}</span>}</p>}
  <a className="text-link" href={p.url} aria-label={`View ${p.title} case study`}>View case study <Arrow /></a>
 </article>;
}
interface Props{projects:CollectionProject[];featuredHtml:string;initialPage?:number}
export default function CollectionBrowser({projects,featuredHtml,initialPage=1}:Props){
 const [selection,setSelection]=useState({category:'all',page:initialPage});const [ready,setReady]=useState(false);
 const start=useRef<HTMLDivElement>(null);const pendingFocus=useRef(false);
 const view=collectionView(projects,selection.category,selection.page);const options=availableCategories(projects);
 useEffect(()=>{const read=()=>{setSelection(stateFromUrl(location.href));};read();setReady(true);addEventListener('popstate',read);return()=>removeEventListener('popstate',read)},[]);
 useEffect(()=>{
  if(!ready)return;
  const canonical=document.querySelector<HTMLLinkElement>('link[rel="canonical"]');if(canonical)canonical.href='https://sana-ishaq-design.github.io'+(view.category==='all'?collectionPath(view.page):collectionPath(1));
  document.title=`UI/UX Case Studies${view.page>1?` — Page ${view.page}`:''} — SaaS, E-commerce & Product Design | Sana Ishaq`;
  if(pendingFocus.current){pendingFocus.current=false;start.current?.focus({preventScroll:true});const header=document.querySelector('.full-header');const offset=header&&['sticky','fixed'].includes(getComputedStyle(header).position)?header.getBoundingClientRect().height:0;window.scrollTo({top:Math.max(0,(start.current?.getBoundingClientRect().top??0)+scrollY-offset-24),behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'})}
 },[ready,view.category,view.page]);
 const select=(category:string,page:number,focus=false)=>{const next=collectionView(projects,category,page);history.pushState({},'',collectionHref(next.page,next.category));pendingFocus.current=focus;setSelection({category:next.category,page:next.page})};
 const pageLink=(page:number,label:string)=> <a href={collectionHref(page,view.category)} onClick={e=>{if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();select(view.category,page,true)}} aria-label={label.startsWith('Page')?label:undefined} aria-current={page===view.page?'page':undefined}>{label.startsWith('Page')?page:label}</a>;
 const label=categories.find(([id])=>id===view.category)?.[1]??'All Work';
 return <div id="collection-start" className="collection-browser" ref={start} tabIndex={-1} aria-label="Case study collection">
  <div className="collection-filters" role="group" aria-label="Filter case studies by category">{options.map(([id,label])=><button key={id} type="button" disabled={!ready} aria-pressed={view.category===id} aria-controls="projectsList" onClick={()=>select(id,1)}>{label}</button>)}</div>
  <p className="collection-status" role="status" aria-live="polite" aria-atomic="true">{view.total} {view.total===1?'case study':'case studies'}{view.category!=='all'?` · ${label}`:''}{view.totalPages>1?` · Page ${view.page} of ${view.totalPages}`:''}</p>
  <div id="projectsList">
   {view.featured&&<div className="collection-featured"><div className="featured-label">Featured case study</div><div dangerouslySetInnerHTML={{__html:featuredHtml}} /></div>}
   <div className="collection-grid">{view.cards.map((p:CollectionProject)=><Card key={p.id} project={p} />)}</div>
   {!view.total&&<div className="collection-empty"><h2>No published case studies in this category yet.</h2><p>Explore the current collection while more work is being prepared.</p><button type="button" onClick={()=>select('all',1)}>View all work</button></div>}
  </div>
  {view.totalPages>1&&<nav className="collection-pagination" aria-label="Case study pages">
   {view.page>1?pageLink(view.page-1,'Previous'):<span className="pagination-disabled" aria-disabled="true">Previous</span>}
   <ol>{paginationPages(view.page,view.totalPages).map((p:number,i:number,list:number[])=><li key={p}>{i>0&&p-list[i-1]>1&&<span className="pagination-gap" aria-hidden="true">…</span>}{pageLink(p,`Page ${p}`)}</li>)}</ol>
   {view.page<view.totalPages?pageLink(view.page+1,'Next'):<span className="pagination-disabled" aria-disabled="true">Next</span>}
  </nav>}
  <noscript><p className="collection-noscript">Category filtering requires JavaScript. All published case studies remain available through the collection and page links.</p></noscript>
 </div>;
}
