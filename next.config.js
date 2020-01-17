require('dotenv').config();

module.exports = {
  target: 'serverless',
  env: {
    CRYSTALLIZE_TENANT_ID: process.env.CRYSTALLIZE_TENANT_ID,
    CRYSTALLIZE_GRAPH_URL_BASE: process.env.CRYSTALLIZE_GRAPH_URL_BASE,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
  }
};
