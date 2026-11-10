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
test('About contains the exact compact expertise groups and Contact has one direct email action',()=>{
 assert.equal((home.match(/id="expertise-title"/g)||[]).length,1);
 const expertise=home.slice(home.indexOf('class="about-expertise"'),home.indexOf('</dl>',home.indexOf('class="about-expertise"'))).replaceAll('&amp;','&');
 for(const text of ['Core Expertise','UX Research, Audits & Analysis','Workflow analysis · Usability findings','Product & Interaction Design','User flows · Interaction states · Handoff','E-commerce & Conversion UX','Journey mapping · Conversion optimization','UI Design & Design Systems','UI design · Component systems'])assert.ok(expertise.includes(text),text);
 assert.equal((expertise.match(/<dt>/g)||[]).length,4);
 assert.doesNotMatch(expertise,/<a\b|HaierMall|Subscribe|UTWorX|Barcode/);
 const contact=home.slice(home.indexOf('<section id="contact"'),home.indexOf('</section>',home.indexOf('<section id="contact"')));
 assert.equal((contact.match(/<a /g)||[]).length,1);assert.match(contact,/mailto:sanaishaq47@gmail.com/);assert.match(contact,/Good work starts/);
 assert.doesNotMatch(contact,/calendly|costing you conversions/);
});
test('personal introduction and approved neighboring sections remain exact',()=>{
 const current=readFileSync('src/components/HomepageSections.astro','utf8');
 const previous=execFileSync('git',['show','cafc8a2:src/components/HomepageSections.astro'],{encoding:'utf8'});
 for(const id of ['process','services','contact']){const extract=s=>s.slice(s.indexOf(`<section id="${id}"`),s.indexOf('</section>',s.indexOf(`<section id="${id}"`))+10);assert.equal(extract(current),extract(previous),id)}
 const introduction=s=>s.slice(s.indexOf('<p class="about-eyebrow">'),s.indexOf('</div>',s.indexOf('<div class="about-links">'))+6);
 assert.equal(introduction(current),introduction(previous));
});
test('approved detailed project sources, imagery, and shared footer remain untouched',()=>{
 for(const file of ['src/components/FeaturedProjects.astro','src/components/Footer.astro','src/components/HaierMallCase.astro','src/content/haiermall.ts',...['haiermall','subscribe-me','utworx','barcode-studio'].map(n=>'src/pages/case-studies/'+n+'-case-study.astro')])
 assert.equal(readFileSync(file,'utf8'),execFileSync('git',['show','55acef2:'+file],{encoding:'utf8'}),file);
});
