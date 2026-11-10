import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const home=readFileSync('dist/homepage.html','utf8');
test('archive excludes full cases and accurately exposes an empty collection',()=>{
 const archive=readFileSync('dist/archive.html','utf8');
 for(const page of [home,archive]){assert.match(page,/No smaller projects are published here yet/);assert.doesNotMatch(page,/<li class="archive-row"/)}
 assert.match(archive,/<h1[^>]*id="archive-title"/);assert.match(home,/Explore the Archive/);
 assert.match(archive,/noindex/);assert.match(archive,/href="\/case-studies.html"/);
});
test('About contains one evidence subsection and Contact has one direct email action',()=>{
 assert.equal((home.match(/id="expertise-title"/g)||[]).length,1);
 for(const name of ['UTWorX audit','HaierMall redesign','Subscribe a Car','Barcode Studio handoff'])assert.ok(home.includes(name));
 const contact=home.slice(home.indexOf('<section id="contact"'),home.indexOf('</section>',home.indexOf('<section id="contact"')));
 assert.equal((contact.match(/<a /g)||[]).length,1);assert.match(contact,/mailto:sanaishaq47@gmail.com/);assert.match(contact,/Good work starts/);
 assert.doesNotMatch(contact,/calendly|costing you conversions/);
});
test('approved detailed project sources, imagery, and shared footer remain untouched',()=>{
 for(const file of ['src/components/FeaturedProjects.astro','src/components/Footer.astro','src/components/HaierMallCase.astro','src/content/haiermall.ts',...['haiermall','subscribe-me','utworx','barcode-studio'].map(n=>'src/pages/case-studies/'+n+'-case-study.astro')])
 assert.equal(readFileSync(file,'utf8'),execFileSync('git',['show','55acef2:'+file],{encoding:'utf8'}),file);
});
