import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=()=>readFileSync('dist/case-studies.html','utf8');
test('collection retains four destinations and exact established canonical',()=>{const s=html();for(const route of ['haiermall','subscribe-me','utworx','barcode-studio'])assert.ok(s.includes(`/case-studies/${route}-case-study.html`));assert.equal((s.match(/rel="canonical"/g)||[]).length,1);assert.match(s,/https:\/\/sana-ishaq-design.github.io\/case-studies.html/);assert.equal((s.match(/<article /g)||[]).length,4);assert.equal((s.match(/<h1/g)||[]).length,1);const schema=JSON.parse(s.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);assert.equal(schema.mainEntity.itemListElement.length,4)});
test('collection reconciles scope and removes unsubstantiated duration and rating claims',()=>{const s=html();assert.doesNotMatch(s,/4\.8|6 Months|12 Weeks|1 Weeks|Sprint delivered|Core workflows overhauled|data-filter=/);assert.match(s,/joining at Sprint 4/);assert.match(s,/formal usability metrics were not collected/);assert.match(s,/UI Designer — Delivery Phase/);assert.match(s,/End-to-end UX · Design \+ handoff/);assert.match(s,/3 months post-launch/);assert.match(s,/Homepage → category/);assert.match(s,/Usability testing/)});

