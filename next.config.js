require('dotenv').config();

module.exports = {
  target: 'serverless',
  env: {
    NEXT_PUBLIC_CRYSTALLIZE_TENANT_ID: 'orn-forlag',
    CRYSTALLIZE_API_URL: process.env.CRYSTALLIZE_API_URL,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    CRYSTALLIZE_TENANT_ID: 'orn-forlag',
    CRYSTALLIZE_SECRET_TOKEN: '49cd2961158e7cbb85e680262b9db991940b17af',
    CRYSTALLIZE_SECRET_TOKEN_ID: '95f29e0c6ec01528bb9f',
  },
};
