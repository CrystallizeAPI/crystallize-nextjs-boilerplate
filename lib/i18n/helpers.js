import fetch from 'cross-fetch';

/**
 * Fetch translation file(s).
 * @function getTranslation
 * @param {string} lang - Language to fetch.
 * @param {array} files - Translation files to fetch.
 * @return {object} Fetched translation files.
 */
export async function getTranslation({ lang, files }) {
  const translation = {};

  try {
    await Promise.all(
      files.map(async file => {
        const response = await fetch(
          `${__crystallizeConfig.HOST_NAME}/static/locales/${lang}/${file}.json`
        );
        translation[file] = await response.json();
      })
    );
  } catch (error) {
    console.error(error); // eslint-disable-line
  }

  return { [lang]: translation };
}
