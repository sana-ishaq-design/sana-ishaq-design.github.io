import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
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
  await copyFile(path, destination);
  manifest.push({path, sha256:createHash('sha256').update(bytes).digest('hex')});
}
await writeFile('.generated-public/preservation.json',JSON.stringify(manifest,null,2));
await mkdir('.generated-public/licenses',{recursive:true});
await copyFile('node_modules/@fontsource-variable/manrope/LICENSE','.generated-public/licenses/Manrope-OFL.txt');
await copyFile('node_modules/@fontsource/instrument-serif/LICENSE','.generated-public/licenses/Instrument-Serif-OFL.txt');
await mkdir('.generated-public/review-images',{recursive:true});
for (const [name, source] of [['haier-home','assets/img/Haier homepage.png'],['haier-detail','assets/img/haier-product detail.png']]) {
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
console.log(`Preserved ${manifest.length} baseline files; generated responsive HaierMall derivatives.`);
