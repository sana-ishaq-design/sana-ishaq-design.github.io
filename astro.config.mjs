import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://sana-ishaq-design.github.io',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  publicDir: './.generated-public',
  integrations: [react()],
  devToolbar: { enabled: false },
});
