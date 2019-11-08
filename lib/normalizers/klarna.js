const klarnaApiCall = require('../util/klarna-utils');

module.exports = async klarnaData => {
  const { klarnaOrderId } = klarnaData;

  try {
    const orderData = await klarnaApiCall({
      method: 'GET',
      uri: `/ordermanagement/v1/orders/${klarnaOrderId}`
    });

    const lineItems = orderData.order_lines;

    const orderItemsArray = lineItems.map(lineItem => {
      const productMetaData = lineItem.merchant_data
        ? JSON.parse(lineItem.merchant_data)
        : {};
      return {
        name: lineItem.name,
        sku: lineItem.reference,
        quantity: lineItem.quantity,
        productId: productMetaData.productId,
        productVariantId: productMetaData.productVariantId,
        imageUrl: lineItem.image_url,
        price: {
          gross: lineItem.unit_price / 100,
          net: lineItem.unit_price / 100,
          currency: orderData.purchase_currency,
          discounts: [
            {
              percent: 0
            }
          ],
          tax: {
            name: productMetaData.taxGroup.name,
            percent: productMetaData.taxGroup.percent
          }
        }
      };
    });

    const customerName = `${orderData.billing_address.given_name} ${orderData.billing_address.family_name}`.split(
      ' '
    );
    const customerShippingName = `${orderData.shipping_address.given_name} ${orderData.shipping_address.family_name}`.split(
      ' '
    );

    // TODO: review what happens to the General Order Vat Group on multiple tax groups on order (mult. items having diff vatTypes, is it a thing?)
    const vatGroup = orderItemsArray[0].price;

    return Promise.resolve({
      customer: {
        identifier: '',
        firstName: customerName[0],
        middleName: customerName.slice(1, customerName.length - 1).join(),
        lastName: customerName[customerName.length - 1],
        birthDate: orderData.customer ? orderData.customer.date_of_birth : null,
        addresses: [
          {
            type: 'billing',
            firstName: customerName[0],
            middleName: customerName.slice(1, customerName.length - 1).join(),
            lastName: customerName[customerName.length - 1],
            street: orderData.billing_address.street_address,
            street2: orderData.billing_address.street_address2,
            postalCode: orderData.billing_address.postal_code,
            city: orderData.billing_address.city,
            state: orderData.billing_address.region,
            country: orderData.billing_address.country,
            phone: orderData.billing_address.phone,
            email: orderData.billing_address.receipt_email
          },
          {
            type: 'delivery',
            firstName: customerShippingName[0],
            middleName: customerShippingName
              .slice(1, customerShippingName.length - 1)
              .join(),
            lastName: customerShippingName[customerShippingName.length - 1],
            street: orderData.shipping_address.street_address,
            street2: orderData.shipping_address.street_address2,
            postalCode: orderData.shipping_address.postal_code,
            city: orderData.shipping_address.city,
            state: orderData.shipping_address.region,
            country: orderData.shipping_address.country,
            phone: orderData.shipping_address.phone,
            email: orderData.shipping_address.receipt_email
          }
        ]
      },
      cart: orderItemsArray,
      payment: [
        {
          provider: 'klarna',
          klarna: {
            klarna: '',
            orderId: orderData.order_id,
            recurringToken: orderData.recurring_token,
            metadata: JSON.stringify({
              status: orderData.status,
              tax_amount: orderData.order_tax_amount
            })
          }
        }
      ],
      total: {
        gross: orderData.order_amount / 100,
        net: orderData.order_amount / 100,
        currency: orderData.purchase_currency,
        discounts: [
          {
            percent: 0
          }
        ],
        tax: {
          name: vatGroup.name,
          percent: vatGroup.percent
        }
      },
      additionalInformation: orderData.merchant_data
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
