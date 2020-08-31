import { useRouter } from 'next/router';

import appConfigRaw from '../../app.config.json';

// Validate locales
if (!appConfigRaw.locales) {
  throw new Error('app.config.js: locales is not defined');
}
if (appConfigRaw.locales.filter((l) => l.isDefault).length > 1) {
  throw new Error('app.config.js: cannot have more than one default locale');
}

const appConfig = {
  ...appConfigRaw,
  locales: appConfigRaw.locales.map((locale) => ({
    ...locale,
    urlPrefix: locale.urlPrefix.replace(/\//g, '')
  }))
};

export const locales = appConfig.locales;

export const defaultLocale = appConfig.locales.find((l) => l.isDefault);

// Get the current locale
export function useLocale() {
  const router = useRouter();

  return getLocaleFromContext(router);
}

/**
 * Determine if it is a multilingual shop. Example:
 * /en/my-product
 * /de/mein-produkt
 */
export const isMultilingual =
  appConfig.locales.length > 1 || appConfig.locales[0]?.urlPrefix.length > 0;

export function getLocaleFromContext({ locale, query, asPath } = {}) {
  function validLocale(urlPrefix) {
    return (
      appConfig.locales.find((l) => l.urlPrefix === urlPrefix) || defaultLocale
    );
  }

  if (locale) {
    return validLocale(locale);
  }

  if (query?.locale) {
    return validLocale(query.locale);
  }

  // Fallback to using the first part of the asPath
  return validLocale(asPath?.split('/').filter(Boolean)[0]);
}

export default appConfig;
