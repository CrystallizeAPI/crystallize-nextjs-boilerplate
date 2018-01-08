const {
  NODE_ENV = 'development',
  PORT = 3000,
  TENANT_ID = 'demo',
  GTM_ID
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  TENANT_ID,
  GTM_ID
};
