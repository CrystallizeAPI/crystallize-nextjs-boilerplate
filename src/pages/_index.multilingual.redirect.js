/**
 * When multilingual is enabled, this file path should be
 * pages/index.js
 */

import acceptLanguage from 'accept-language';

import { locales, defaultLocale } from 'lib/app-config';

// Predefine the supported languages
acceptLanguage.languages(locales.map((l) => l.appLanguage));

/**
 * Redirect the user to the correct locale
 * depending on the language setting in the
 * 'accept-language' HTTP header
 */
export function getServerSideProps({ req, res }) {
  const preferredLanguage = acceptLanguage.get(req.headers['accept-language']);
  const locale =
    locales.find((l) => l.appLanguage === preferredLanguage) || defaultLocale;

  res.writeHead(301, { Location: '/' + locale.urlPrefix });
  res.end();
  return { props: {} };
}

export default function MultilingualRedirect() {
  return '...';
}
