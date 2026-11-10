import {readdir,readFile,writeFile,copyFile,rm} from 'node:fs/promises';
import {join,extname} from 'node:path';

const root='dist-preview';
const base='/portfolio-preview';
const origin='https://sana-ishaq-design.github.io';
// The redesigned homepage is the staging entry point; legacy source is untouched.
await copyFile(join(root,'homepage.html'),join(root,'index.html'));
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){
 const path=join(dir,entry.name);
 if(entry.isDirectory()){await walk(path);continue;}
 if(!['.html','.css','.js','.json','.xml'].includes(extname(path)))continue;
 let text=await readFile(path,'utf8');
 // Keep production canonical declarations authoritative; rewrite only navigation,
 // image/social URLs and generated runtime paths in this disposable output.
 const canonicals=[];
 text=text.replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi,m=>`__PREVIEW_CANONICAL_${canonicals.push(m)-1}__`);
 text=text.replaceAll(origin+'/',origin+base+'/');
 // Covers HTML attributes, CSS url(), srcset entries, JSON props and JS literals.
 text=text.replace(/(["'`(\s])\/(?!\/|portfolio-preview(?:\/|["'`\s)]))(?=[\w#]|["'`])/g,`$1${base}/`);
 text=text.replace(/__PREVIEW_CANONICAL_(\d+)__/g,(_,n)=>canonicals[Number(n)]);
 // This new, staging-only route does not yet have a production counterpart.
 if(path.replaceAll('\\','/').endsWith('/archive.html'))text=text.replace(`rel="canonical" href="${origin}/archive.html"`,`rel="canonical" href="${origin}${base}/archive.html"`);
 if(path.endsWith('.html')){
  text=text.replace(/<meta\b[^>]*name=["'](?:robots|googlebot)["'][^>]*>/gi,'');
  text=text.replace('</head>','<meta name="robots" content="noindex, nofollow, noarchive" /></head>');
 }
 await writeFile(path,text);
}}
await walk(root);
// Allow crawlers to read noindex. robots.txt is not an access-control mechanism.
await writeFile(join(root,'robots.txt'),'User-agent: *\nAllow: /\n# Staging: every HTML page carries noindex. No sitemap is advertised.\n');
await rm(join(root,'sitemap.xml'),{force:true});
await writeFile(join(root,'.nojekyll'),'');
console.log('Prepared isolated /portfolio-preview/ output with redesigned homepage and noindex.');
