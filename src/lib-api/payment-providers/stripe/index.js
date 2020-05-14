import stripeSdk from 'stripe';

export { default as orderNormalizer } from './order-normalizer';

export const client = stripeSdk(process.env.STRIPE_SECRET_KEY);
