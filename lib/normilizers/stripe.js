const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeKey);
// TODO: only require stripe if needed to fetch order data
module.exports = async stripeData => {
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
        gross: lineItem.gross,
        net: lineItem.net,
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
          email: charge.receipt_email
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
          email: charge.receipt_email
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
          orderId: charge.payment_intent,
          paymentMethod: charge.payment_method_details.type,
          paymentMethodId: charge.payment_method,
          paymentIntentId: charge.payment_intent,
          subscriptionId: charge.subscription,
          metadata: ''
        }
      }
    ],
    total: {
      gross: charge.amount / 100,
      net: charge.amount / 100,
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
