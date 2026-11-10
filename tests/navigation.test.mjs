import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('redesigned case pages share homepage navigation with cross-page destinations',()=>{
  const sections=['selected-work','process','archive','services','about','contact'];
  for(const route of ['homepage.html','haiermall-preview.html','case-studies/haiermall-case-study.html',...['barcode-studio','subscribe-me','utworx','haiermall'].map(slug=>`projects/${slug}.html`)]){
    const html=readFileSync(`dist/${route}`,'utf8');
    const header=html.match(/<header\b[^>]*>[\s\S]*?<\/header>/)?.[0];
    assert.ok(header,route);
    assert.ok(header.includes('id="full-menu"'),route);
    for(const section of sections)assert.ok(header.includes(`href="${route==='homepage.html'?'':'/homepage.html'}#${section}"`),`${route}: ${section}`);
    assert.ok(header.includes('id="theme-preference"'),route);
    assert.ok(header.includes('Product Designer'),route);
  }
});
