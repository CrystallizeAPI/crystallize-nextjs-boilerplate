import { getClient } from './index';

export default async function stripeOrderNormalizer({
  paymentIntentId,
  paymentModel
}) {
  const paymentIntent = await getClient().paymentIntents.retrieve(
    paymentIntentId
  );

  const { data } = paymentIntent.charges;
  const charge = data[0];

  const customerName = charge.billing_details.name.split(' ');

  return {
    cart: paymentModel.cart,
    total: paymentModel.total,
    additionalInformation: paymentIntent.merchant_data,
    customer: {
      identifier: '',
      firstName: customerName[0],
      middleName: customerName.slice(1, customerName.length - 1).join(),
      lastName: customerName[customerName.length - 1],
      birthDate: Date,
      addresses: [
        {
          type: 'billing',
          firstName: customerName[0],
          middleName: customerName.slice(1, customerName.length - 1).join(),
          lastName: customerName[customerName.length - 1],
          street: charge.billing_details.address.line1,
          street2: charge.billing_details.address.line2,
          postalCode: charge.billing_details.address.postal_code,
          city: charge.billing_details.address.city,
          state: charge.billing_details.address.state,
          country: charge.billing_details.address.country,
          phone: charge.billing_details.phone,
          email:
            charge.receipt_email || paymentModel.customer?.addresses?.[0]?.email
        },
        {
          type: 'delivery',
          firstName: customerName[0],
          middleName: customerName.slice(1, customerName.length - 1).join(),
          lastName: customerName[customerName.length - 1],
          street: charge.billing_details.address.line1,
          street2: charge.billing_details.address.line2,
          postalCode: charge.billing_details.address.postal_code,
          city: charge.billing_details.address.city,
          state: charge.billing_details.address.state,
          country: charge.billing_details.address.country,
          phone: charge.billing_details.phone,
          email:
            charge.receipt_email || paymentModel.customer?.addresses?.[0]?.email
        }
      ]
    },
    payment: [
      {
        provider: 'stripe',
        stripe: {
          stripe: charge.id,
          customerId: charge.customer,
          orderId: charge.payment_intent,
          paymentMethod: charge.payment_method_details.type,
          paymentMethodId: charge.payment_method,
          paymentIntentId: charge.payment_intent,
          subscriptionId: charge.subscription,
          metadata: ''
        }
      }
    ]
  };
}
