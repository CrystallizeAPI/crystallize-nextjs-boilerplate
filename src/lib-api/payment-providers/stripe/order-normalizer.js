import { getClient } from './index';

export default async function stripeOrderNormalizer({
  lineItems,
  paymentIntentId,
}) {
  const paymentIntent = await getClient().paymentIntents.retrieve(
    paymentIntentId
  );

  const { data } = paymentIntent.charges;
  const charge = data[0];

  const orderItemsArray = lineItems.map((lineItem) => {
    const productMetaData = lineItem.merchant_data
      ? JSON.parse(lineItem.merchant_data)
      : {};

    return {
      name: lineItem.name,
      sku: lineItem.sku,
      quantity: lineItem.quantity,
      subscription: lineItem.subscription,
      productId: productMetaData.productId,
      productVariantId: productMetaData.productVariantId,
      imageUrl: lineItem.image_url,
      price: {
        gross: lineItem.gross,
        net: lineItem.net,
        currency: 'nok',
        discounts: [
          {
            percent: 0,
          },
        ],
        tax: {
          name: lineItem.tax_group.name,
          percent: lineItem.tax_group.percent,
        },
      },
    };
  });

  // TODO: review what happens to the General Order Vat Group on multiple tax groups on order (mult. items having diff vatTypes, is it a thing?)
  const vatGroup = orderItemsArray[0].price.tax;

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
          email: charge.receipt_email,
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
          email: charge.receipt_email,
        },
      ],
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
          metadata: '',
        },
      },
    ],
    total: {
      gross: charge.amount / 100,
      net: charge.amount / 100,
      currency: charge.currency,
      discounts: [
        {
          percent: 0,
        },
      ],
      tax: {
        name: vatGroup.name,
        percent: vatGroup.percent,
      },
    },
    additionalInformation: paymentIntent.merchant_data,
  };
}
