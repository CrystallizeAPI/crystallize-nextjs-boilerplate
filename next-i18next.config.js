const path = require('path');

/**
 * Intl takes the BCP 47 language code as
 * constructor argument, so you (might)
 * need to convert the locale to BCP 47
 */
const localeToBCP47 = {
  en: 'en-US',
  no: 'nb-NO'
};

// For more information on internationalized routing,
// check out the Next.js docs:
// https://nextjs.org/docs/advanced-features/i18n-routing

module.exports = {
  i18n: {
    // Match these locales with app.config.json
    defaultLocale: 'en',
    locales: ['en', 'no'],
    localePath: path.resolve('./public/static/locales')
  },
  serializeConfig: false,
  interpolation: {
    escapeValue: false, // react already safe from xss
    format(value, format, locale, { currency }) {
      const localeBCP47 = localeToBCP47[locale];

      if (format === 'currency') {
        if (typeof value === 'undefined' || !currency) {
          return 'N/A';
        }
        return new Intl.NumberFormat(localeBCP47 || locale, {
          style: 'currency',
          currency
        }).format(value);
      }

      return value;
    }
  }
};
