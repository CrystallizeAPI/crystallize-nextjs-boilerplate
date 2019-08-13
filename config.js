/* eslint no-underscore-dangle: "off" */
const {
  NODE_ENV = 'development',
  CRYSTALLIZE_TENANT_ID = 'demo',
  CRYSTALLIZE_GRAPH_URL_BASE = 'https://graph.crystallize.com',
  GTM_ID
} = process.env;

const DEV = NODE_ENV !== 'production';

global.__crystallizeConfig = {
  NODE_ENV,
  TENANT_ID: CRYSTALLIZE_TENANT_ID,
  GRAPH_URL: `${CRYSTALLIZE_GRAPH_URL_BASE}/tenant/${CRYSTALLIZE_TENANT_ID}`,
  GTM_ID,
  DEV
};

module.exports = global.__crystallizeConfig;
