import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('case navigation and image inspection are real static links with complete fallback',()=>{
 const html=readFileSync('dist/case-studies/haiermall-case-study.html','utf8');
 assert.match(html,/aria-label="On this page"/);
 assert.match(html,/Jump to section/);
 assert.ok(html.indexOf('class="chapter-navigation')>html.indexOf('id="results-grid"'),'Chapter navigation follows the introduction and metrics');
 for(const id of ['the-project','the-impact','understanding-the-problem'])assert.equal([...html.matchAll(new RegExp(`id="${id}"`,'g'))].length,1,`Single ${id}`);
 assert.equal([...html.matchAll(/class="outcome-list"/g)].length,1,'One outcome group');
 for(const id of ['the-project','the-impact','understanding-the-problem','purchase-journey','building-for-implementation','results-and-reflection','whats-next'])assert.ok(html.includes(`href="#${id}"`));
 assert.match(html,/href="\/case-studies.html"[^>]*>All Case Studies/);
 for(const label of ['Inspect Homepage','Inspect Product listing','Inspect Product detail','Inspect Checkout'])assert.ok(html.includes(label));
});
