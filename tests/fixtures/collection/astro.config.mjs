import {defineConfig} from 'astro/config';
import base from '../../../astro.config.mjs';
import {fileURLToPath} from 'node:url';
export default defineConfig({...base,outDir:'./review/collection-fixture-build',vite:{resolve:{alias:[{find:/^.*collection-projects\.json$/,replacement:fileURLToPath(new URL('./projects.json',import.meta.url))}]}}});

