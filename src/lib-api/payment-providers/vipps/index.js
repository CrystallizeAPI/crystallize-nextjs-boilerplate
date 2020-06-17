import VippsClient from '@crystallize/node-vipps';

export { default as orderNormalizer } from './order-normalizer';

let client;

export const getClient = () => {
  if (client) {
    return client;
  }

  client = new VippsClient({
    testDrive: true,
    id: process.env.VIPPS_CLIENT_ID,
    secret: process.env.VIPPS_CLIENT_SECRET,
    subscriptionId: process.env.VIPPS_SUB_KEY
  });

  return client;
};
