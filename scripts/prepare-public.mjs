import { mkdir, copyFile, readFile, writeFile, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

// The audited production snapshot is immutable input, not a template to overwrite.
const baseline = 'bb92411ebb56f45afdbe80dc48c8c698133cfe91';
const entries = execFileSync('git', ['ls-tree','-r',baseline],{encoding:'utf8'}).trim().split('\n').map(line => {
  const [metadata,path] = line.split('\t');
  return {path, blob:metadata.split(' ')[2]};
});
const manifest = [];
for (const {path,blob} of entries) {
  const bytes = await readFile(path);
  const actual = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
  if (actual !== blob) throw new Error(`Baseline file changed: ${path}. Explicit preservation approval required.`);
  const destination = join('.generated-public', path);
  await mkdir(dirname(destination), {recursive:true});
  // Owner-approved local migration: Astro now owns this exact output route.
  // Keep checking the immutable source hash, and preserve every other document.
  if(['case-studies/haiermall-case-study.html','case-studies/subscribe-me-case-study.html','case-studies/utworx-case-study.html','case-studies.html','case-studies/barcode-studio-case-study.html'].includes(path)) await rm(destination,{force:true});
  else await copyFile(path, destination);
  manifest.push({path, sha256:createHash('sha256').update(bytes).digest('hex')});
}
await writeFile('.generated-public/preservation.json',JSON.stringify(manifest,null,2));
await mkdir('.generated-public/licenses',{recursive:true});
await copyFile('node_modules/@fontsource-variable/manrope/LICENSE','.generated-public/licenses/Manrope-OFL.txt');
await copyFile('node_modules/@fontsource/instrument-serif/LICENSE','.generated-public/licenses/Instrument-Serif-OFL.txt');
await mkdir('.generated-public/review-images',{recursive:true});
for (const [name, source] of [['haier-home','assets/img/Haier homepage.png'],['haier-detail','assets/img/haier-product detail.png'],['haier-listing','assets/img/haier-product listing default.png'],['haier-checkout','assets/img/haier-checkout.png']]) {
  for (const width of [480, 800, 1280, 1440, 1920]) {
    await sharp(source).resize({width,withoutEnlargement:true}).webp({quality:85}).toFile(`.generated-public/review-images/${name}-${width}.webp`);
  }
}
// Art direction uses only crops from the original pixels, never generated UI.
for (const [name,source,region,widths] of [
  ['haier-home-focus','assets/img/Haier homepage.png',{left:120,top:140,width:1200,height:1000},[480,800,1200]],
  ['haier-detail-focus','assets/img/haier-product detail.png',{left:450,top:200,width:900,height:570},[480,800,900]],
]) {
  for(const width of widths) await sharp(source).extract(region).resize({width}).webp({quality:90}).toFile(`.generated-public/review-images/${name}-${width}.webp`);
}
console.log(`Verified ${manifest.length} immutable baseline files; Astro owns the approved HaierMall output route; generated responsive derivatives.`);

// Subscribe a Car: original screenshots, never enlarged or recolored.
const carSource=await readFile('src/content/subscribe-story.ts','utf8');
for(const [,name,file,widthText] of carSource.matchAll(/\s+(\w+):\['([^']+)',(\d+),/g)) {
 const width=Number(widthText),sizes=[360,720,1200].filter(w=>w<=width);
 if(!sizes.includes(width)&&width<1200)sizes.push(width);
 for(const size of sizes) await sharp('assets/img/'+file).resize({width:size,withoutEnlargement:true}).webp({quality:90}).toFile(`.generated-public/review-images/car-${name}-${size}.webp`);
}

// Complete-homepage and project-note artwork, from unchanged repository originals.
for(const [name,source,widths] of [
 ['subscribe-browse','assets/img/Browse Car - subscribe me.png',[360]],
 ['utworx-overview','assets/img/Overview - UTWorX.png',[800,1280,1920]],
 ['barcode','assets/img/Overview - Barcode.png',[480,800,1200]],
 ['sana-about','assets/img/about.png',[480,800]],
]) for(const width of widths) await sharp(source).resize({width,withoutEnlargement:true}).webp({quality:88}).toFile('.generated-public/review-images/'+name+'-'+width+'.webp');
for(const [name,source,region,widths] of [
 ['subscribe-detail','assets/img/Vehicle Details - subscribe me.png',{left:0,top:0,width:1440,height:2300},[480,800]],
 ['subscribe-dashboard','assets/img/Dashboard - subscribe me.png',{left:0,top:0,width:1440,height:2700},[480,800]],
 ['utworx-focus','assets/img/Overview - UTWorX.png',{left:900,top:260,width:1700,height:1600},[480,800]],
]) for(const width of widths) await sharp(source).extract(region).resize({width}).webp({quality:90}).toFile('.generated-public/review-images/'+name+'-'+width+'.webp');


// UTWorX: responsive derivatives only; immutable complete originals remain available.
const utAssets=JSON.parse(await readFile('src/content/utworx-assets.json','utf8'));
for(const [name,[file,width]] of Object.entries(utAssets)) {
 for(const size of [480,960,1440,1920].filter(w=>w<=width)) await sharp('assets/img/'+file).resize({width:size,withoutEnlargement:true}).webp({quality:90}).toFile(`.generated-public/review-images/ut-${name}-${size}.webp`);
}
const utCrops=JSON.parse(await readFile('src/content/utworx-crops.json','utf8'));
for(const [name,box] of Object.entries(utCrops)) {
 const [file,w,h]=utAssets[name];const [x,y,cw,ch]=box;
 const region={left:Math.round(w*x),top:Math.round(h*y),width:Math.round(w*cw),height:Math.round(h*ch)};
 for(const size of [480,960])await sharp('assets/img/'+file).extract(region).resize({width:size,withoutEnlargement:true}).webp({quality:92}).toFile(`.generated-public/review-images/ut-${name}-detail-${size}.webp`);
}

// Existing collection artwork: preserve originals; generate modest responsive copies.
for(const [name,file] of [['haier','Haier homepage.png'],['utworx','Overview - UTWorX.png'],['subscribe','Select Return.png'],['barcode','Export Dark - Barcde.png']])for(const width of [400,800])await sharp('assets/img/'+file).resize({width,withoutEnlargement:true}).webp({quality:90}).toFile(`.generated-public/review-images/collection-${name}-${width}.webp`);

// Barcode Studio: responsive derivatives of all original design artifacts.
const barcodeSource=await readFile('src/content/barcode-story.ts','utf8');
for(const [,name,file] of barcodeSource.matchAll(/\s+(\w+):\['([^']+)'/g)) for(const width of [480,800,1200]) await sharp('assets/img/'+file).resize({width,withoutEnlargement:true}).webp({quality:90}).toFile(`.generated-public/review-images/bc-${name}-${width}.webp`);
// Mobile crops remove only presentation canvas around authentic product frames.
for(const [name,file,left,top,width,height] of [
 ['createLight','Create Light - Barcode.png',420,65,360,770],['createDark','Create Dark - Barcode.png',420,65,360,770],
 ['exportLight','Export Light - Barcode.png',395,80,410,740],['exportDark','Export Dark - Barcde.png',395,80,410,740],
 ['aboutLight','About Light - Barcode.png',340,160,520,600],['aboutDark','About Dark - Barcode.png',340,160,520,600]
]) await sharp('assets/img/'+file).extract({left,top,width,height}).webp({quality:95}).toFile(`.generated-public/review-images/bc-${name}-mobile.webp`);
