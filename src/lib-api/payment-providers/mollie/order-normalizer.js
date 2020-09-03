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
  mollieOrderData,
  customerData,
  validPaymentModel
}) {
  if (crystallizeOrderId) {
    // TODO: review what happens to the General Order Vat Group on multiple tax groups on order (mult. items having diff vatTypes, is it a thing?)

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
      payment: [
        {
          provider: 'custom',
          custom: {
            properties: generateMollieProperties(mollieOrderData)
          }
        }
      ],
      total: {
        gross: parseFloat(mollieOrderData.amount.value),
        net: parseFloat(mollieOrderData.amount.value),
        currency: mollieOrderData.amount.currency,
        discounts: [
          {
            percent: 0
          }
        ]
      },
      id: crystallizeOrderId,
      additionalInformation: 'STATUS CHECKED'
    };
  } else {
    const { customer, cart, total } = validPaymentModel;

    const orderItemsArray = cart.map((lineItem) => {
      return {
        name: lineItem.name,
        sku: lineItem.sku,
        quantity: lineItem.quantity,
        subscription: lineItem.subscription,
        productId: lineItem.productId,
        productVariantId: lineItem.productVariantId,
        imageUrl: lineItem.image_url,
        price: lineItem.price
      };
    });

    return {
      customer: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        addresses: [
          {
            type: 'billing',
            firstName: customer.firstName,
            lastName: customer.lastName,
            street: 'Test line1',
            street2: 'Test line2',
            postalCode: 'Test postal_code',
            city: 'Test city',
            state: 'Test state',
            country: 'Test country',
            phone: 'Test Phone',
            email: customer.addresses[0]?.email
          }
        ]
      },
      cart: orderItemsArray,

      total: {
        ...total,
        tax: cart[0].price.tax
      },
      additionalInformation: JSON.stringify({ status: 'initiated' })
    };
  }
}
