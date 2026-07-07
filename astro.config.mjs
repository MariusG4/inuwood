import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';
import tailwindcss from '@tailwindcss/vite';
import pwa from '@vite-pwa/astro';

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
    pwa({
      registerType: 'autoUpdate',
      manifest: {
        name: 'InuWood - Tâmplărie Artizanală',
        short_name: 'InuWood',
        description: 'Atelier de tâmplărie artizanală în Bacău. Mobilier din lemn masiv realizat manual.',
        theme_color: '#5D4037',
        background_color: '#F9F7F2',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        navigateFallback: '/',
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});