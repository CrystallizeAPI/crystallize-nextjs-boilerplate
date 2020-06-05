import Router from 'next/router';

/**
 * Specify which language to use
 */

const fallbackLanguage = 'en';
const languages = ['en'];

function validateLanguage(lang) {
  return languages.includes(lang) ? lang : fallbackLanguage;
}

export function getLanguage(lang) {
  /**
   * Optionally use the Use the current asPath (/my-products/teddy-bear)
   * to determine the language
   */
  let language;

  if (lang) {
    language = lang.match(/[a-zA-Z-]{2,10}/g)[0] || fallbackLanguage;
    language = language.split('-')[0];
  }

  return validateLanguage(language);
}

export function configureLanguage(ctx) {
  const { req, res, asPath } = ctx;

  const language = req
    ? req.headers['accept-language']
    : window.navigator.language;

  let lang = getLanguage(language);

  if (asPath === '/') {
    redirectToLanguage(lang, res);
  }

  return lang;
}

export function redirectToLanguage(language = fallbackLanguage, res) {
  if (res) {
    res.writeHead(302, { Location: `/${language}/` });

    return res.end();
  }

  Router.push(`/${language}/`);
}
