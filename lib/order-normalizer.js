// const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripeKey = 'sk_test_k0fieKiwdJMCSHjy22GmCR5e';
const stripe = require('stripe')(stripeKey);
// TODO: only require stripe if needed to fetch order data
const stripeNormalizer = async stripeData => {
  // if (process.env.env !== 'production')
  //   stripeData = 'pi_1FKgEUDxZGnyVowgUdb6UsRa';

  const paymentIntent = await stripe.paymentIntents.retrieve(stripeData);

  const { data } = paymentIntent.charges;
  const charge = data[0];
  // const orderItemsArray = data.map(orderLine => {
  //   return {
  //     name: orderLine.metadata.name,
  //     sku: orderLine.metadata.discription,
  //     quantity: orderLine.quanity,
  //     subscription: orderLine.subscription,
  //     price: {
  //       gross: orderLine.amount,
  //       net: orderLine.amount,
  //       currency: orderLine.currency,
  //       discounts: [
  //         {
  //           percent: 0
  //         }
  //       ],
  //       tax: {
  //         name: '',
  //         percent: 25
  //       }
  //     }
  //   };
  // });
  const orderItemsArray = [
    {
      name: 'HardcodeD Item',
      sku: 'hard-code',
      quantity: 1,
      price: {
        gross: 2000.0,
        net: 20000.0,
        currency: 'nok',
        tax: { name: 'freeVat', percent: 0 }
      }
    }
  ];

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
          orderId: '',
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
  let data;
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
      data = paymentIntentId;
      return stripeNormalizer(data);
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
