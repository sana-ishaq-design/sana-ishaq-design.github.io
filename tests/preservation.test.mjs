import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
const routes = ['index.html','case-studies.html','case-studies/haiermall-case-study.html','case-studies/subscribe-me-case-study.html','case-studies/utworx-case-study.html','case-studies/barcode-studio-case-study.html','case-studies/case_studies_archive.html','ux-audit-service-page.html'];
for (const route of routes) test(`preserves exact existing document: /${route}`, () => {
  assert.ok(existsSync(`dist/${route}`), `Missing static output ${route}`);
  assert.deepEqual(readFileSync(`dist/${route}`), readFileSync(route));
});
test('all original assets remain byte-identical',()=>{
  const manifest = JSON.parse(readFileSync('.generated-public/preservation.json','utf8'));
  for (const file of manifest) {
    assert.ok(existsSync(`dist/${file.path}`), `Missing ${file.path}`);
    assert.equal(createHash('sha256').update(readFileSync(`dist/${file.path}`)).digest('hex'), file.sha256, file.path);
  }
});
test('review slice emits readable HTML without disputed metrics',()=>{
  assert.ok(existsSync('dist/phase-1.html'), 'Missing slice');
  const html = readFileSync('dist/phase-1.html','utf8');
  assert.match(html, /Helping SaaS Products/);
  assert.match(html, /HaierMall/);
  assert.doesNotMatch(html, /31%|32%|25%|20%|40%/);
  assert.match(html, /noindex/);
  assert.match(html, /<main/);
});
test('refinement restores artifact evidence and discloses pending outcome figures',()=>{
  const html=readFileSync('dist/phase-1.html','utf8');
  assert.match(html,/id="project-evidence"/,'Prominent evidence section is present');
  assert.match(html,/Outcome figures await confirmation/);
  assert.match(html,/Checkout/);
  assert.match(html,/Proposed introduction/);
  assert.match(html,/for approval/);
  assert.match(html,/<details[^>]*id="header-menu"/);
  assert.match(html,/<summary/);
});
test('the original long introduction and SEO headline remain preserved as explicit baseline',()=>{
  const baseline=JSON.parse(readFileSync('content/baseline.json','utf8'));
  assert.ok(readFileSync('case-studies/haiermall-case-study.html','utf8').includes(baseline.haierIntroduction));
  assert.equal(baseline.heroHeadline,'Helping SaaS Products & Ecommerce Brands Build Better Digital Experiences');
});
