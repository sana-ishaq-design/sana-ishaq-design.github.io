import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {test} from 'node:test';
test('UTWorX mobile interface details use source crops with complete originals retained',()=>{
 const html=readFileSync('dist/case-studies/utworx-case-study.html','utf8');
 for(const name of ['maintenance','reporting','task','preliminary','notification','service','scheduling','success'])assert.ok(html.includes(`ut-${name}-detail-`),name);
 const assets=JSON.parse(readFileSync('src/content/utworx-assets.json','utf8'));
 for(const [file] of Object.values(assets))assert.ok(html.includes('/assets/img/'+encodeURIComponent(file)),file);
});
