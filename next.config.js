const withOffline = require('next-offline');

const serverConfig = require('./server/config');

let exp = {};

if (!serverConfig.DEV) {
  exp = withOffline({
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
}

module.exports = exp;
