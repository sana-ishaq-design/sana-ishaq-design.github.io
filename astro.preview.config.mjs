import { defineConfig } from 'astro/config';
import production from './astro.config.mjs';

// Opt-in only: the default production build and metadata stay untouched.
export default defineConfig({ ...production, base: '/portfolio-preview', outDir: './dist-preview' });
