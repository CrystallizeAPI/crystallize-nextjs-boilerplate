module.exports = {
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
