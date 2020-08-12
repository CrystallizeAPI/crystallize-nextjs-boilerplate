import { createMollieClient } from '@mollie/api-client';

export { default as orderNormalizer } from './order-normalizer';

let client;
export const getClient = () => {
  if (client) {
    return client;
  }
  client = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

  return client;
};
