import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://inuwood.ro',
  integrations: [tailwind()],
  output: 'static',
  compressHTML: true,
});
