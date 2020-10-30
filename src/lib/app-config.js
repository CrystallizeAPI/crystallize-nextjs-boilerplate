import { useRouter } from 'next/router';

import appConfigRaw from '../../app.config.json';

// Validate locales
if (!appConfigRaw.locales) {
  throw new Error('app.config.js: locales is not defined');
}
if (appConfigRaw.locales.filter((l) => l.isDefault).length > 1) {
  throw new Error('app.config.js: cannot have more than one default locale');
}

const appConfig = appConfigRaw;

export const locales = appConfig.locales;

export const defaultLocale =
  appConfig.locales.find((l) => l.isDefault) || appConfig.locales[0];

// Get the current locale
export function useLocale() {
  const router = useRouter();

  return getLocaleFromContext(router);
}

export function getValidLocale(name) {
  return appConfig.locales.find((l) => l.locale === name) || defaultLocale;
}

export function getLocaleFromContext({ locale, query, asPath } = {}) {
  if (locale) {
    return getValidLocale(locale);
  }

  if (query?.locale) {
    return getValidLocale(query.locale);
  }

  // Fallback to using the first part of the asPath
  return getValidLocale(asPath?.split('/').filter(Boolean)[0]);
}

export default appConfig;
