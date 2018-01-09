/* eslint no-underscore-dangle: "off" */
const {
  NODE_ENV = 'development',
  PORT = 3000,
  TENANT_ID = 'demo',
  GTM_ID
} = process.env;

global.__crystallizeConfig = {
  NODE_ENV,
  PORT,
  TENANT_ID,
  GTM_ID
};

module.exports = global.__crystallizeConfig;
