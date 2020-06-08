import VippsClient from '@crystallize/node-vipps';

export { default as orderNormalizer } from './order-normalizer';

const {
  VIPPS_CLIENT_ID,
  VIPPS_CLIENT_SECRET,
  VIPPS_SUB_KEY,
  ENV
} = process.env;
let client;

export const getClient = () => {
  if (client) {
    return client;
  }

  client = new VippsClient({
    id: VIPPS_CLIENT_ID,
    secret: VIPPS_CLIENT_SECRET,
    subscriptionId: VIPPS_SUB_KEY,
    testDrive: ENV === 'DEV' || false
  });

  return client;
};
