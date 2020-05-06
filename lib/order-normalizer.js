const {
  stripeNormalizer,
  klarnaNormalizer,
  vippsNormalizer
} = require('./normalizers');

const orderQueryNormalizer = async (
  orderData,
  paymentMethod,
  { paymentIntentId, klarnaOrderId, vippsOrderId }
) => {
  switch (paymentMethod) {
    case 'stripe':
      // @extraStripe
      // Keep code to perhaps handle Stripe events? e.g. paymentintent_success for 3D secure? Same boilerplate or not? Find the rest: search for @extraStripe
      // data = await stripe.webhooks.constructEvent(
      //   stripeRawBody,
      //   stripeSignature,
      //   // eslint-disable-next-line no-underscore-dangle
      //   global.__crystallizeConfig.SUCCESS_PAYMENT_STRIPE_WEBHOOK_TOKEN
      // );
      return stripeNormalizer({
        paymentIntentId,
        lineItems: orderData.lineItems
      });
    case 'klarna':
      return klarnaNormalizer({ klarnaOrderId });
    case 'paypal':
      break;
    case 'vipps':
      return vippsNormalizer({ vippsOrderId }, orderData);
    default:
      break;
  }
  return true;
};

module.exports = {
  orderQueryNormalizer,
  stripeNormalizer
};
