import * as normalizers from './normalizers';

export const stripeNormalizer = normalizers.stripeNormalizer;
export const klarnaNormalizer = normalizers.klarnaNormalizer;

export async function orderQueryNormalizer(
  orderData,
  paymentMethod,
  { paymentIntentId, klarnaOrderId }
) {
  switch (paymentMethod) {
    case 'stripe':
      // @extraStripe
      // Keep code to perhaps handle Stripe events? e.g. paymentintent_success for 3D secure? Same boilerplate or not? Find the rest: search for @extraStripe
      // data = await stripe.webhooks.constructEvent(
      //   stripeRawBody,
      //   stripeSignature,
      //   process.env.SUCCESS_PAYMENT_STRIPE_WEBHOOK_TOKEN
      // );
      return normalizers.stripeNormalizer({
        paymentIntentId,
        lineItems: orderData.lineItems
      });
    case 'klarna':
      return normalizers.klarnaNormalizer({ klarnaOrderId });
    case 'paypal':
      break;
    case 'vipps':
      break;
    default:
      break;
  }
  return true;
}
