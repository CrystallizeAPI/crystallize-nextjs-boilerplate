const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeKey);
// TODO: only require stripe if needed to fetch order data
const stripeNormalizer = async stripeData => {
  const { lineItems } = stripeData;

  const paymentIntent = await stripe.paymentIntents.retrieve(
    stripeData.paymentIntentId
  );

  const { data } = paymentIntent.charges;
  const charge = data[0];
  const orderItemsArray = lineItems.map(lineItem => {
    return {
      name: lineItem.name,
      sku: lineItem.sku,
      quantity: lineItem.quantity,
      subscription: lineItem.subscription,
      price: {
        gross: lineItem.amount,
        net: lineItem.amount,
        currency: 'nok',
        discounts: [
          {
            percent: 0
          }
        ],
        tax: {
          name: '',
          percent: 25
        }
      }
    };
  });

  const customerName = charge.billing_details.name.split(' ');
  return {
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
          email: charge.billing_details.email
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
          email: charge.billing_details.email
        }
      ]
    },
    cart: orderItemsArray,
    payment: [
      {
        provider: 'stripe',
        stripe: {
          stripe: charge.id,
          customerId: charge.customer,
          orderId: paymentIntent.id,
          paymentMethod: '',
          paymentMethodId: '',
          paymentIntentId: charge.payment_intent,
          subscriptionId: charge.subscription,
          metadata: ''
        }
      }
    ],
    total: {
      gross: charge.amount,
      net: charge.amount,
      currency: charge.currency,
      discounts: [
        {
          percent: 0
        }
      ],
      tax: {
        name: charge.tax,
        percent: 25
      }
    }
  };
};

const orderQueryNormalizer = async (
  orderData,
  paymentMethod,
  { paymentIntentId }
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
      break;
    case 'paypal':
      break;
    case 'vipps':
      break;
    default:
      break;
  }
  return true;
};

module.exports = {
  orderQueryNormalizer,
  stripeNormalizer
};
