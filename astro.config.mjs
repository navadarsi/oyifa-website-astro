// @ts-check
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://oyifa.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  redirects: {
    '/login': 'https://app.oyifa.com/login',
    '/register': 'https://app.oyifa.com/register',
    '/register/vendor': 'https://app.oyifa.com/register',
    '/register/client': 'https://app.oyifa.com/register',
    '/year': 'https://app.oyifa.com',
    '/شهر': 'https://app.oyifa.com',
    '/سنة': 'https://app.oyifa.com',
  },

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
