import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';

test('complete candidate has the requested section order and locked Hero',()=>{
  const page=readFileSync('dist/homepage.html','utf8');
  let previous=-1;
  for(const id of ['hero-title','selected-work','process','archive','services','about','contact','site-footer']){
    const index=page.indexOf(`id="${id}"`);assert.ok(index>previous,`Complete ordered section ${id}`);previous=index;
  }
  const source=readFileSync('src/pages/homepage.astro','utf8'),baseline=readFileSync('src/pages/phase-1.astro','utf8');
  const title=s=>s.match(/<h1 id="hero-title">([^]*?)<\/h1>/)?.[0];
  assert.equal(title(source),title(baseline),'Approved headline markup remains exact');
  const image=s=>s.match(/<figure class="project-figure">([^]*?)<\/figure>/)?.[0];
  assert.equal(image(source),image(baseline),'Authentic HaierMall image composition remains exact');
  assert.match(page,/Explore Selected Work/);assert.match(page,/href="#contact"[^>]*>Get in Touch/);
  assert.doesNotMatch(page,/The design question|Proposed copy|HaierMall is an appliance|outcome-attribution/);
  assert.match(page,/Read Full Case Study/);
  for(const file of ['src/pages/phase-1.astro','src/styles/editorial.css','src/components/ThemePreference.tsx'])assert.equal(readFileSync(file,'utf8'),execFileSync('git',['show',`c42e5e9:${file}`],{encoding:'utf8'}),file);
  assert.match(page,/noindex/);assert.match(page,/rel="canonical" href="https:\/\/sana-ishaq-design.github.io\/"/);
  for(const value of ['+31%','−20%','+40%','+15%'])assert.ok(page.includes(value));
  assert.doesNotMatch(page,/href="[^"]*(?:demo|explore-experience)/);
});

test('all supported Archive projects have static notes and authentic source links',()=>{
  for(const slug of ['barcode-studio','subscribe-me','utworx','haiermall']){
    const html=readFileSync(`dist/projects/${slug}.html`,'utf8');
    assert.match(html,/<h1/);assert.match(html,/Read (?:the )?[Ff]ull [Cc]ase [Ss]tudy|Read Case Study/);
    assert.match(html,/Role/);assert.match(html,/assets|review-images/);assert.match(html,/noindex/);
    assert.doesNotMatch(html,/will be added|Lorem ipsum|placeholder|PeelAways|All Hung Up/);
  }
});

test('candidate reuses original metadata and active copy without invented inventory',()=>{
  const page=readFileSync('dist/homepage.html','utf8');
  const copy=JSON.parse(readFileSync('src/content/homepage.json','utf8'));
  assert.ok(page.replaceAll('&amp;','&').includes(copy.metadata.title));
  const source=readFileSync('index.html','utf8').replace(/&amp;?/g,'&').replace(/<!--[^]*?-->/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
  for(const item of [...copy.services,...copy.process])assert.ok(source.includes(item.description),'Copy comes from active published source');
  const schema=page.match(/<script type="application\/ld\+json">([^]*?)<\/script>/);
  const person=JSON.parse(schema[1]);assert.equal(person['@type'],'Person');assert.equal(person.name,'Sana Ishaq');assert.equal(person.image,undefined,'Missing portrait is not invented or misidentified');
  assert.doesNotMatch(page,/PeelAways|All Hung Up|Lorem ipsum|under construction|Upload hero mockup/);
  assert.equal((page.match(/name="viewport"/g)||[]).length,1);
});
