import { klarnaDenormalizer } from './denormalizers';

export function orderDataDenormalizer(paymentMethod, orderData) {
  switch (paymentMethod) {
    case 'stripe':
      break;
    case 'klarna':
      return klarnaDenormalizer(orderData);
    case 'paypal':
      break;
    case 'vipps':
      break;
    default:
      break;
  }
  return orderData;
}
