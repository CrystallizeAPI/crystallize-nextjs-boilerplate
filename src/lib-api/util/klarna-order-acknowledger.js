import klarnaApiCall from './klarna-utils';

export default async function klarnaOrderAcknowledger(orderId) {
  return klarnaApiCall({
    uri: `/ordermanagement/v1/orders/${orderId}/acknowledge`,
    method: 'POST',
  });
}
