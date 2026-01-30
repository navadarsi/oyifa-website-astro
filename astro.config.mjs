// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://oyifa.com',

  // Integrations
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          ar: 'ar-SA',
        },
      },
      filter: (page) =>
        !page.includes('/api/') &&
        !page.includes('/_astro/') &&
        !page.includes('/admin/'),
    }),
  ],

  // i18n routing for English and Arabic
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    routing: {
      prefixDefaultLocale: false, // /about instead of /en/about
    },
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
