import fetch from 'isomorphic-fetch';

/**
 * Fetch translation file(s).
 * @function getTranslation
 * @param {string} lang - Language to fetch.
 * @param {array} files - Translation files to fetch.
 * @param {string} baseUrl - Locale location.
 * @return {object} Fetched translation files.
 */
export async function getTranslation({ lang, files, baseUrl }) {
  const translation = {};

  try {
    await Promise.all(
      files.map(file => async () => {
        const response = await fetch(`${baseUrl}${lang}/${file}.json`);
        translation[file] = await response.json();
      })
    );
  } catch (error) {
    console.error(error); // eslint-disable-line
  }

  return { [lang]: translation };
}
