import {existsSync,readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
import assert from 'node:assert/strict';
assert.equal(existsSync('dist-preview/ux-audit-service-page.html'),false,'Pricing page must be physically absent from staging');
assert.equal(existsSync('dist-preview/sitemap.xml'),false,'No staging sitemap advertises excluded routes');
assert.equal(existsSync('dist/ux-audit-service-page.html'),true,'Default build preserves the legacy production route');
let pages=0;
function check(dir){for(const entry of readdirSync(dir,{withFileTypes:true})){const file=join(dir,entry.name);if(entry.isDirectory())check(file);else if(entry.name.endsWith('.html')){const html=readFileSync(file,'utf8');assert.doesNotMatch(html,/<a\b[^>]*href=["'][^"']*ux-audit-service-page\.html/i,file);assert.match(html,/<meta name="robots" content="noindex, nofollow, noarchive"/i,file);pages++}}}
check('dist-preview');
console.log(`PASS: ${pages} staging HTML pages have noindex and no excluded navigation; pricing file absent, production route preserved.`);
