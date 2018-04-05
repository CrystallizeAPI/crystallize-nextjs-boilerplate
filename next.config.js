const withOffline = require('next-offline');

module.exports = withOffline({
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /api/,
        handler: 'networkFirst'
      }
    ]
  },
  webpack(config) {
    return config;
  }
});
