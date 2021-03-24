const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  async redirects() {
    return [
      {
        source: '/web-frontpage',
        destination: '/',
        permanent: false
      }
    ];
  }
};
