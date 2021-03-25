const path = require('path');

// For more information on internationalized routing,
// check out the Next.js docs:
// https://nextjs.org/docs/advanced-features/i18n-routing

module.exports = {
  i18n: {
    // Match these locales with app.config.json
    defaultLocale: 'en',
    locales: ['en', 'no'],
    localePath: path.resolve('./public/static/locales')
  }
};
