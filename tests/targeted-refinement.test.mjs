import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';

const source=readFileSync('src/pages/phase-1.astro','utf8');
test('targeted refinement keeps the approved project article and result data unchanged',()=>{
  const previous=execFileSync('git',['show','05968af:src/pages/phase-1.astro'],{encoding:'utf8'});
  const article=text=>text.slice(text.indexOf('<article'),text.indexOf('</article>')+10);
  assert.equal(article(source),article(previous));
  assert.equal(readFileSync('src/content/haiermall.ts','utf8'),execFileSync('git',['show','05968af:src/content/haiermall.ts'],{encoding:'utf8'}));
});
test('refined review has an icon button instead of an appearance dropdown',()=>{
  const html=readFileSync('dist/phase-1.html','utf8');
  assert.match(html,/<button[^>]*id="theme-preference"/);
  assert.doesNotMatch(html,/<select|>Appearance</);
  assert.match(html,/theme-moon/);
  assert.match(html,/theme-sun/);
});

test('approved project layout and metric CSS rules are preserved',()=>{
  const previous=execFileSync('git',['show','05968af:src/styles/editorial.css'],{encoding:'utf8'});
  const rules=text=>[...text.matchAll(/(?:^|\n)\s*((?:(?:\.project|\.outcome|\.artwork|\.work-intro)[^{}]*|h[234][^{]*))\{[^{}]*\}/g)].map(match=>match[0].trim());
  assert.deepEqual(rules(readFileSync('src/styles/editorial.css','utf8')),rules(previous));
});
