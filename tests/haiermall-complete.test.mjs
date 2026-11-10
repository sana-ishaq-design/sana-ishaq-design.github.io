import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const original=readFileSync('case-studies/haiermall-case-study.html','utf8');
const plain=s=>s.replace(/<[^>]+>/g,' ').replace(/&#39;|&#x27;/g,"'").replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
test('complete HaierMall preserves substantive source findings, decisions and learnings in seven chapters',()=>{
 const html=readFileSync('dist/case-studies/haiermall-case-study.html','utf8'),text=plain(html);
 for(const id of ['the-project','the-impact','understanding-the-problem','purchase-journey','building-for-implementation','results-and-reflection','whats-next'])assert.ok(html.includes(`id="${id}"`),id);
 for(const cls of ['audit-body','dec-desc','learning-text']){
  const passages=[...original.matchAll(new RegExp(`<div class="${cls}">([\\s\\S]*?)<\\/div>`,'g'))];
  assert.equal(passages.length,cls==='learning-text'?4:6);
  for(const [,passage] of passages)assert.ok(text.includes(plain(passage)),plain(passage));
 }
 for(const image of ['haier-home','haier-listing','haier-detail','haier-checkout'])assert.ok(html.includes(`/review-images/${image}-`),image);
 for(const value of ['+31%','−20%','+40%','+15%','3 months post-launch','Homepage → category','Usability testing','Average session'])assert.ok(text.includes(value),value);
 assert.ok(text.includes('Performance metrics were provided by the product management and development teams following deployment.'));
 assert.ok(text.includes('Baymard research context'));
 assert.ok(html.includes('href="/case-studies/subscribe-me-case-study.html"'));
 assert.ok(html.includes('href="https://github.com/zfhassaan"'));
 assert.doesNotMatch(html,/Representative design slice|Read the complete existing case study|−32%|\+25%|data-target=/);
});
test('canonical migration retains the exact SEO block and index policy; alias remains noindex',()=>{
 const html=readFileSync('dist/case-studies/haiermall-case-study.html','utf8');
 const block=original.slice(original.indexOf('<title>'),original.indexOf('</script>',original.indexOf('<script type="application/ld+json">'))+9);
 const normalize=s=>s.replace(/\s+/g,' ').trim();
 assert.equal(normalize(html.slice(html.indexOf('<title>'),html.indexOf('</script>',html.indexOf('<script type="application/ld+json">'))+9)),normalize(block));
 assert.match(html,/name="robots" content="index, follow"/);
 assert.match(readFileSync('dist/haiermall-preview.html','utf8'),/noindex, follow/);
});
