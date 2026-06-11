import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://inuwood.ro',
  output: 'static',
  compressHTML: true,

  integrations: [
    partytown({
      // Adds data-layer.push events to the queue
      forward: ['dataLayer.push', 'gtag'],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});