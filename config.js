/* eslint no-underscore-dangle: "off" */
const {
  PORT = 3000,
  NODE_ENV = 'development',
  CRYSTALLIZE_TENANT_ID = 'demo',
  CRYSTALLIZE_GRAPH_URL_BASE = 'https://graph.crystallize.com',
  CRYSTALLIZE_ORDER_API_URL = 'https://api-dev.crystallize.digital',
  SUCCESS_PAYMENT_STRIPE_WEBHOOK_TOKEN,
  GTM_ID,
  MY_CRYSTALLIZE_SECRET_TOKEN
} = process.env;

const DEV = NODE_ENV !== 'production';

global.__crystallizeConfig = {
  PORT,
  NODE_ENV,
  TENANT_ID: CRYSTALLIZE_TENANT_ID,
  GRAPH_URL: `${CRYSTALLIZE_GRAPH_URL_BASE}/tenant/${CRYSTALLIZE_TENANT_ID}`,
  ORDER_API_URL: `${CRYSTALLIZE_ORDER_API_URL}/${CRYSTALLIZE_TENANT_ID}/orders`,
  GTM_ID,
  SUCCESS_PAYMENT_STRIPE_WEBHOOK_TOKEN,
  MY_CRYSTALLIZE_SECRET_TOKEN,
  DEV
};

module.exports = global.__crystallizeConfig;
