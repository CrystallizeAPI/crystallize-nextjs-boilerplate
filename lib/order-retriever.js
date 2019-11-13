const klarnaApiCall = require('./util/klarna-utils');
const { fetchCrystallizeOrder } = require('./crystallize-order-handler');
// eslint-disable-next-line consistent-return
async function orderRetriever(
  paymentMethod,
  isCrystallizeRequest,
  { orderId }
) {
  try {
    switch (paymentMethod) {
      case 'klarna':
        return klarnaApiCall({
          uri: `/ordermanagement/v1/orders/${orderId}`,
          method: 'GET'
        });
      case 'stripe':
        // TODO: implement 3D secure callbacks from Stripe
        break;
      default:
        if (isCrystallizeRequest) return fetchCrystallizeOrder(orderId);

        throw new Error(
          `Please provide a Payment Method(${paymentMethod}) or make this a Crystallize request by using isCrystallizeRequest(${isCrystallizeRequest})`
        );
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = { orderRetriever };
