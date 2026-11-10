import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('HaierMall preview preserves metadata, verified Results and source-backed scope statically',()=>{
  const html=readFileSync('dist/haiermall-preview.html','utf8');
  const original=readFileSync('case-studies/haiermall-case-study.html','utf8');
  const title=original.match(/<title>([\s\S]*?)<\/title>/)[1];
  assert.ok(html.includes(`<title>${title}</title>`));
  assert.ok(html.includes('https://sana-ishaq-design.github.io/case-studies/haiermall-case-study.html'));
  for(const value of ['+31%','−20%','+40%','+15%','3 months post-launch','Homepage → category','Usability testing','Average session','Sole designer','50+ components','Chinese and Pakistani'])assert.ok(html.includes(value),value);
  assert.ok(html.includes('noindex, follow'));
  assert.ok(html.includes('raw analytics dashboards were not directly accessible'));
  assert.ok(html.includes('desktop export'));
  assert.ok(!html.includes('−32%')&&!html.includes('+25%'));
  assert.ok(!html.includes('data-target='));
});
