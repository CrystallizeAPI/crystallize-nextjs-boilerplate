import KlarnaClient from '@crystallize/node-klarna/v3';

export { default as orderNormalizer } from './order-normalizer';
export { default as orderDenormalizer } from './order-denormalizer';

export const client = new KlarnaClient({
  testDrive: process.env.NODE_ENV !== 'production',
  username: process.env.KLARNA_USERNAME,
  password: process.env.KLARNA_PASSWORD,
});
