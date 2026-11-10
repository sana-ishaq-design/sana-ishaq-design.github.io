import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('UTWorX is a complete static case with preserved anchors and factual limits',()=>{
 const html=readFileSync('dist/case-studies/utworx-case-study.html','utf8');
 assert.match(html,/class="utworx-case"/);
 for(const id of ['overview','challenge','goals','dashboard','workorders','maintenance','reporting','decisions','screens','impact','learnings','reflection']) assert.ok(html.includes(`id="${id}"`),id);
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1);
 assert.match(html,/formal usability metrics were not collected/i);
 assert.match(html,/Lead UI\/UX Designer/);
 assert.match(html,/sole designer/i);
 assert.doesNotMatch(html,/Five audit failures|persistent progress bar|insight in seconds/);
 for(const name of Object.keys(JSON.parse(readFileSync('src/content/utworx-assets.json','utf8'))))assert.ok(html.includes(`ut-${name}-`),name);
});
