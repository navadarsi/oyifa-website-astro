const isProd = import.meta.env.PROD;

export const URLS = {
  website: isProd ? 'https://oyifa.com' : 'http://localhost:4321',
  app: isProd ? 'https://app.oyifa.com' : 'http://localhost:8081',
};
