/* eslint no-underscore-dangle: "off" */
const {
  NODE_ENV = 'development',
  PORT,
  CRYSTALLIZE_TENANT_ID,
  CRYSTALLIZE_API_URL,
  GTM_ID
} = process.env;

const DEV = NODE_ENV !== 'production';

global.__crystallizeConfig = {
  NODE_ENV,
  PORT: parseInt(PORT, 10),
  TENANT_ID: CRYSTALLIZE_TENANT_ID,
  API_URL: CRYSTALLIZE_API_URL,
  GTM_ID,
  DEV
};

module.exports = global.__crystallizeConfig;
