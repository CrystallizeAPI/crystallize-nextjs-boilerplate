import KlarnaClient from '@crystallize/node-klarna/v3';

export { default as orderNormalizer } from './order-normalizer';
export { default as orderDenormalizer } from './order-denormalizer';

let client;
export const getClient = () => {
  if (client) {
    return client;
  }

  client = new KlarnaClient({
    testDrive: process.env.NODE_ENV !== 'production',
    username: process.env.KLARNA_USERNAME,
    password: process.env.KLARNA_PASSWORD
  });

  return client;
};
