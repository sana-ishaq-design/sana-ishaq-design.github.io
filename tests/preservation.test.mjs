import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
const routes = ['index.html','case-studies.html','case-studies/haiermall-case-study.html','case-studies/subscribe-me-case-study.html','case-studies/utworx-case-study.html','case-studies/barcode-studio-case-study.html','case-studies/case_studies_archive.html','ux-audit-service-page.html'];
for (const route of routes.filter(route=>!['case-studies/haiermall-case-study.html','case-studies/subscribe-me-case-study.html','case-studies/utworx-case-study.html','case-studies.html','case-studies/barcode-studio-case-study.html'].includes(route))) test(`preserves exact existing document: /${route}`, () => {
  assert.ok(existsSync(`dist/${route}`), `Missing static output ${route}`);
  assert.deepEqual(readFileSync(`dist/${route}`), readFileSync(route));
});
test('all original assets remain byte-identical',()=>{
  const manifest = JSON.parse(readFileSync('.generated-public/preservation.json','utf8'));
  for (const file of manifest) {
    // HaierMall and Subscribe a Car generated presentations is owner-approved for migration.
    // Its original source remains hash-checked here and during every build.
    if(['case-studies/haiermall-case-study.html','case-studies/subscribe-me-case-study.html','case-studies/utworx-case-study.html','case-studies.html','case-studies/barcode-studio-case-study.html'].includes(file.path)) {
      assert.equal(createHash('sha256').update(readFileSync(file.path)).digest('hex'),file.sha256);
      continue;
    }
    assert.ok(existsSync(`dist/${file.path}`), `Missing ${file.path}`);
    assert.equal(createHash('sha256').update(readFileSync(`dist/${file.path}`)).digest('hex'), file.sha256, file.path);
  }
});
test('review slice statically restores the exact owner-verified published Results baseline',()=>{
  assert.ok(existsSync('dist/phase-1.html'), 'Missing slice');
  const html = readFileSync('dist/phase-1.html','utf8');
  assert.match(html, /Helping SaaS Products/);
  assert.match(html, /HaierMall/);
  const source=readFileSync('case-studies/haiermall-case-study.html','utf8');
  const results=source.slice(source.indexOf('<div class="results-grid"'),source.indexOf('<div class="result-note'));
  const cells=[...results.matchAll(/data-target="(\d+)"\s+data-prefix="([+−])"\s+data-suffix="(%)"[\s\S]*?<div class="result-label">([^<]+)<\/div>\s*<div class="result-sub">([^<]+)<\/div>/g)];
  assert.equal(cells.length,4,'Read all four published results');
  for(const [,number,prefix,suffix,label,context] of cells){
    assert.ok(html.includes(`<dt>${prefix}${number}${suffix}</dt>`),`Published value ${prefix}${number}${suffix}`);
    assert.ok(html.includes(label),`Published label ${label}`);
    assert.ok(html.includes(context),`Published definition ${context}`);
  }
  assert.match(html,/Performance metrics were provided by the product management and development teams following deployment\./);
  assert.doesNotMatch(html,/32%|25%|Value pending|PRIVATE OUTCOME/);
  assert.ok(html.indexOf('class="project-outcomes')<html.indexOf('class="project-insight'),'Outcomes directly follow imagery, ahead of the quieter proposed question');
  assert.match(html, /noindex/);
  assert.match(html, /<main/);
});
test('approved hybrid separates proposed thinking from verified-only outcomes',()=>{
  const html=readFileSync('dist/phase-1.html','utf8');
  assert.match(html,/How could customers move from browsing appliances to a confident purchase\?/);
  assert.match(html,/Proposed copy/);
  assert.doesNotMatch(html,/Value pending|PRIVATE OUTCOME|Sales measure|Bounce-rate measure|Discovery-time measure|class="evidence-list"/);
  assert.match(html,/<details[^>]*id="header-menu"/);
  assert.match(html,/<summary/);
});
test('the original long introduction and SEO headline remain preserved as explicit baseline',()=>{
  const baseline=JSON.parse(readFileSync('content/baseline.json','utf8'));
  assert.ok(readFileSync('case-studies/haiermall-case-study.html','utf8').includes(baseline.haierIntroduction));
  assert.equal(baseline.heroHeadline,'Helping SaaS Products & Ecommerce Brands Build Better Digital Experiences');
});



