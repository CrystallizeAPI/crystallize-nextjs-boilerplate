module.exports = {
  // For more information on internationalized routing,
  // check out the Next.js docs:
  // https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    locales: ['en', 'no'],
    defaultLocale: 'en'
  },
  async redirects() {
    return [
      {
        source: '/web-frontpage',
        destination: '/',
        permanent: true
      }
    ];
  }
};
