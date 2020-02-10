require('dotenv').config();

module.exports = {
  target: 'serverless',
  env: {
    CRYSTALLIZE_TENANT_ID: process.env.CRYSTALLIZE_TENANT_ID,
    CRYSTALLIZE_API_URL: process.env.CRYSTALLIZE_API_URL,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
  }
};
