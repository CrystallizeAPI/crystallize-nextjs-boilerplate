import stripeSdk from 'stripe';

export { default as orderNormalizer } from './order-normalizer';

let client;
export const getClient = () => {
  if (client) {
    return client;
  }

  client = stripeSdk(process.env.STRIPE_SECRET_KEY);

  return client;
};
