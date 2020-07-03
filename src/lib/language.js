/**
 * Specify which languages to fetch from Crystallize
 */
const languages = (process.env.NEXT_PUBLIC_CRYSTALLIZE_LANGUAGES || 'en').split(
  ','
);

export const isMultilingual = ['true', '1', 1, 'yes'].includes(
  process.env.NEXT_PUBLIC_CRYSTALLIZE_IS_MULTILINGUAL
);

export function getLanguages() {
  return languages;
}

export const defaultLanguage = languages[0];

function validLanguage(lang) {
  return languages.includes(lang) ? lang : defaultLanguage;
}

export function getLanguage({ asPath, query } = {}) {
  if (query?.language) {
    return query.language;
  }

  /**
   * Optionally use the current asPath (/en/my-products/teddy-bear)
   * to determine the language
   */
  const languageFromUrl = asPath?.split('/').filter(Boolean)[0];

  return validLanguage(languageFromUrl);
}
