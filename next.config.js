require('dotenv').config();

module.exports = {
  target: 'serverless',
  env: {
    NEXT_PUBLIC_CRYSTALLIZE_TENANT_ID: 'orn-forlag',
    CRYSTALLIZE_API_URL: process.env.CRYSTALLIZE_API_URL,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    CRYSTALLIZE_TENANT_ID: 'super-awesome-tenant',
    CRYSTALLIZE_SECRET_TOKEN: '7d39624514c25a173b3eb3edc1913392c90c3b0d',
    CRYSTALLIZE_SECRET_TOKEN_ID: '91ecfe73669a8a077012'
  }
};
