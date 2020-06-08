/**
 * Specify which language to use
 */
export const fallbackLanguage = 'en';
const languages = ['en'];

function validateLanguage(lang) {
  return languages.includes(lang) ? lang : fallbackLanguage;
}

export function getLanguage({ asPath, res } = {}) {
  /**
   * Optionally use the current asPath (/en/my-products/teddy-bear)
   * to determine the language
   */
  const languageFromUrl = asPath?.split('/').filter(Boolean)[0];
  const language = validateLanguage(languageFromUrl);

  // redirect the user from / to /[language]
  if (asPath === '/' && res) {
    res.setHeader('Location', `/${language}`);
    res.writeHead(302);

    return res.end('ok');
  }

  return language;
}
