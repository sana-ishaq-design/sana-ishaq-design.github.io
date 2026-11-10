import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync('dist/case-studies/subscribe-me-case-study.html','utf8');
const source=readFileSync('case-studies/subscribe-me-case-study.html','utf8');
const plain=s=>s.replace(/<[^>]*>/g,' ').replace(/&#39;|&#x27;/g,"'").replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
test('Subscribe route preserves metadata with one established canonical',()=>{
 const metadata=source.slice(source.indexOf('<title>'),source.indexOf('</script>',source.indexOf('<script type="application/ld+json">'))+9);
 assert.ok(html.includes(metadata));assert.equal((html.match(/rel="canonical"/g)||[]).length,1);
 assert.doesNotMatch(html,/subscribe-a-car-case-study\.html/);
});
test('Subscribe retains meaningful fragments, published figures and attribution',()=>{
 for(const id of ['joining','challenge','journey','management','system','screens','outcomes','outcomes-grid','reflection'])assert.ok(html.includes(`id="${id}"`),id);
 for(const text of ['100K+','3.9★','217+ reviews','50+ components','6 sprints','UI Designer — Delivery Phase','Sprint 4','AW Rostamani','RBB Global',"UX team's research",'Shifali Kawatra','Alex I'])assert.ok(plain(html).includes(text),text);
 assert.doesNotMatch(html,/No reviewer complains|Operations gap \(not UX\)/);
});
test('Subscribe preserves unique challenge, journey and reflection reasoning',()=>{
 for(const pattern of [/<div class="ch-prob">([\s\S]*?)<\/div>/g,/<div class="ch-resp">([\s\S]*?)<\/div>/g,/<div class="jr-text">([\s\S]*?)<\/div>/g,/<div class="ri reveal">\s*<h4>[\s\S]*?<\/h4>\s*<p>([\s\S]*?)<\/p>/g])for(const m of source.matchAll(pattern))assert.ok(plain(html).includes(plain(m[1])),plain(m[1]));
 assert.equal((html.match(/class="car-screen/g)||[]).length,22);
});
