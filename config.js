/* eslint no-underscore-dangle: "off" */
const {
  PORT = 3000,
  NODE_ENV = 'development',
  COUNTRY_CODE = 'NO',
  CRYSTALLIZE_TENANT_ID = 'demo',
  CRYSTALLIZE_GRAPH_URL_BASE = 'https://api-dev.crystallize.digital',
  CRYSTALLIZE_ORDER_API_URL = 'https://api-dev.crystallize.digital',
  SUCCESS_PAYMENT_STRIPE_WEBHOOK_TOKEN,
  GTM_ID,
  MY_CRYSTALLIZE_SECRET_TOKEN,
  MY_CRYSTALLIZE_SECRET_TOKEN_ID,
  SENDGRID_API_KEY,
  TERMS_URI = 'https://myeshopterms.com',
  CHECKOUT_URI = 'https://myshopcheckout.com',
  KLARNA_USERNAME,
  KLARNA_PASSWORD,
  NGROK_URL,
  KLARNA_API_URL = 'https://api.playground.klarna.com',
  HOST_URL = 'http://localhost:3000'
} = process.env;

const DEV = NODE_ENV !== 'production';

global.__crystallizeConfig = {
  PORT,
  NODE_ENV,
  COUNTRY_CODE,
  TENANT_ID: CRYSTALLIZE_TENANT_ID,
  GRAPH_URL: `${CRYSTALLIZE_GRAPH_URL_BASE}/${CRYSTALLIZE_TENANT_ID}/catalogue`,
  ORDER_API_URL: `${CRYSTALLIZE_ORDER_API_URL}/${CRYSTALLIZE_TENANT_ID}/orders`,
  GTM_ID,
  SENDGRID_API_KEY,
  SUCCESS_PAYMENT_STRIPE_WEBHOOK_TOKEN,
  MY_CRYSTALLIZE_SECRET_TOKEN,
  MY_CRYSTALLIZE_SECRET_TOKEN_ID,
  DEV,
  TERMS_URI,
  CHECKOUT_URI,
  KLARNA_API_URL,
  KLARNA_USERNAME,
  KLARNA_PASSWORD,
  NGROK_URL,
  HOST_URL
};

module.exports = global.__crystallizeConfig;
