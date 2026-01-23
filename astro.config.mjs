// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://oyifa.com',

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
