function generateMollieProperties(orderData) {
  const propertiesArray = [
    {
      property: 'resource',
      value: orderData.resource
    },
    {
      property: 'resource_id',
      value: orderData.id
    },
    {
      property: 'mode',
      value: orderData.mode
    },
    {
      property: 'method',
      value: orderData.method
    },
    {
      property: 'status',
      value: orderData.status
    },
    {
      property: 'profileId',
      value: orderData.profileId
    },
    {
      property: 'mandateId',
      value: orderData.mandateId
    },
    {
      property: 'customerId',
      value: orderData.customerId
    },
    {
      property: 'sequenceType',
      value: orderData.sequenceType
    }
  ];

  return propertiesArray;
}

export default function mollieOrderNormalizer({
  crystallizeOrderId,
  orderData,
  customerData,
  lineItems,
  personalDetails,
  currency
}) {
  if (crystallizeOrderId) {
    const orderItemsArray = orderData.metadata.basket.map((lineItem) => {
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
          currency: 'EUR',
          discounts: [
            {
              percent: 0
            }
          ],
          tax: {
            name: lineItem.tax_group.name,
            percent: lineItem.tax_group.percent
          }
        }
      };
    });
    // TODO: review what happens to the General Order Vat Group on multiple tax groups on order (mult. items having diff vatTypes, is it a thing?)
    const vatGroup = orderItemsArray[0].price.tax;

    const customerName = customerData.name.split(' ');

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
            street: 'Test line1',
            street2: 'Test line2',
            postalCode: 'Test postal_code',
            city: 'Test city',
            state: 'Test state',
            country: 'Test country',
            phone: 'Test Phone',
            email: customerData.email
          },
          {
            type: 'delivery',
            firstName: customerName[0],
            middleName: customerName.slice(1, customerName.length - 1).join(),
            lastName: customerName[customerName.length - 1],
            street: 'Test line1',
            street2: 'Test line2',
            postalCode: 'Test postal_code',
            city: 'Test city',
            state: 'Test state',
            country: 'Test country',
            phone: 'Test Phone',
            email: customerData.email
          }
        ]
      },
      cart: orderItemsArray,
      payment: [
        {
          provider: 'custom',
          custom: {
            properties: generateMollieProperties(orderData)
          }
        }
      ],
      total: {
        gross: parseFloat(orderData.amount.value),
        net: parseFloat(orderData.amount.value),
        currency: orderData.amount.currency,
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
      id: crystallizeOrderId,
      additionalInformation: 'STATUS CHECKED'
    };
  } else {
    let totalGrossCartAmount = 0;
    let totalNetCartAmount = 0;

    const orderItemsArray = lineItems.map((lineItem) => {
      totalGrossCartAmount += lineItem.gross;
      totalNetCartAmount += lineItem.net;
      return {
        name: lineItem.name,
        sku: lineItem.sku,
        quantity: lineItem.quantity,
        subscription: lineItem.subscription,
        productId: lineItem.productId,
        productVariantId: lineItem.productVariantId,
        imageUrl: lineItem.image_url,
        price: {
          gross: lineItem.gross,
          net: lineItem.net,
          currency: currency,
          discounts: [
            {
              percent: 0
            }
          ],
          tax: {
            name: lineItem.tax_group.name,
            percent: lineItem.tax_group.percent
          }
        }
      };
    });

    return {
      customer: {
        firstName: personalDetails.firstName,
        lastName: personalDetails.lastName,
        addresses: [
          {
            type: 'billing',
            firstName: personalDetails.firstName,
            lastName: personalDetails.lastName,
            street: 'Test line1',
            street2: 'Test line2',
            postalCode: 'Test postal_code',
            city: 'Test city',
            state: 'Test state',
            country: 'Test country',
            phone: 'Test Phone',
            email: personalDetails.email
          }
        ]
      },
      cart: orderItemsArray,

      total: {
        gross: totalGrossCartAmount,
        net: totalNetCartAmount,
        currency: currency,
        discounts: [
          {
            percent: 0
          }
        ],
        tax: {
          name: lineItems[0].tax_group.name,
          percent: lineItems[0].tax_group.percent
        }
      },
      additionalInformation: JSON.stringify({ status: 'initiated' })
    };
  }
}
