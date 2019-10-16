/* eslint no-underscore-dangle: "off" */
const {
  PORT = 3000,
  NODE_ENV = 'development',
  CRYSTALLIZE_TENANT_ID = 'super-awesome-tenant',
  CRYSTALLIZE_GRAPH_URL_BASE = 'https://api-dev.crystallize.digital',
  CRYSTALLIZE_ORDER_API_URL = 'https://api-dev.crystallize.digital',
  SUCCESS_PAYMENT_STRIPE_WEBHOOK_TOKEN,
  GTM_ID,
  MY_CRYSTALLIZE_SECRET_TOKEN,
  STORE_URI,
  TERMS_URI,
  KLARNA_CONFIRMATION_URI,
  KLARNA_USERNAME,
  KLARNA_PASSWORD,
  NGROK_URL,
  KLARNA_API_URL = 'https://api.playground.klarna.com'
} = process.env;

const DEV = NODE_ENV !== 'production';

global.__crystallizeConfig = {
  PORT,
  NODE_ENV,
  TENANT_ID: CRYSTALLIZE_TENANT_ID,
  GRAPH_URL: `${CRYSTALLIZE_GRAPH_URL_BASE}/${CRYSTALLIZE_TENANT_ID}/catalogue`,
  ORDER_API_URL: `${CRYSTALLIZE_ORDER_API_URL}/${CRYSTALLIZE_TENANT_ID}/orders`,
  GTM_ID,
  SUCCESS_PAYMENT_STRIPE_WEBHOOK_TOKEN,
  MY_CRYSTALLIZE_SECRET_TOKEN,
  DEV,
  STORE_URI,
  TERMS_URI,
  KLARNA_CONFIRMATION_URI,
  KLARNA_API_URL,
  KLARNA_USERNAME,
  KLARNA_PASSWORD,
  NGROK_URL
};

module.exports = global.__crystallizeConfig;
