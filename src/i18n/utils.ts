import { defaultLang, languages, ui } from './ui';

export type Lang = keyof typeof ui;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function getRouteFromUrl(url: URL): string {
  const pathname = url.pathname;
  const lang = getLangFromUrl(url);

  if (lang === defaultLang) {
    return pathname;
  }

  // Remove the language prefix
  return pathname.replace(`/${lang}`, '') || '/';
}

export function getLocalizedPath(path: string, lang: Lang): string {
  let localized = lang === defaultLang ? path : `/${lang}${path === '/' ? '' : path}`;
  if (!localized.endsWith('/') && !localized.includes('.')) {
    localized += '/';
  }
  return localized;
}

export function isRTL(lang: Lang): boolean {
  return lang === 'ar';
}

export { defaultLang, languages };

