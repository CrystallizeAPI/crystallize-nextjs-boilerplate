import { Klarna } from '@crystallize/node-klarna';

export { default as orderNormalizer } from './order-normalizer';
export { default as orderDenormalizer } from './order-denormalizer';

export const client = new Klarna({
  username: process.env.KLARNA_USERNAME,
  password: process.env.KLARNA_PASSWORD
});
