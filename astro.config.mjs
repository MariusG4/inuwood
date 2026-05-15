import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://inuwood.ro',
  output: 'static',
  compressHTML: true,
});
