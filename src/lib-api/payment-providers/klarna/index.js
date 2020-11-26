import { Klarna } from '@crystallize/node-klarna';

export { default as orderNormalizer } from './order-normalizer';
export { default as orderDenormalizer } from './order-denormalizer';

/**
 * Read more about how to talk to the Klarna API here:
 * https://developers.klarna.com/api/#introduction
 */
let klarnaClient;
if (process.env.KLARNA_USERNAME && process.env.KLARNA_PASSWORD) {
  klarnaClient = new Klarna({
    username: process.env.KLARNA_USERNAME,
    password: process.env.KLARNA_PASSWORD,
    apiEndpoint: 'https://api.playground.klarna.com'
  });
}

export const client = klarnaClient;
