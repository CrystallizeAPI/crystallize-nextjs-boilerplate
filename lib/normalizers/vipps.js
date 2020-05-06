const generateVippsProperties = vippsData => {
  const propertiesArray = [
    {
      property: 'vipps_bankIdVerified',
      value: vippsData.userDetails.bankIdVerified
    },
    {
      property: 'vipps_ssn',
      value: vippsData.userDetails.ssn
    },
    {
      property: 'vipps_userId',
      value: vippsData.userDetails.userId
    }
  ];

  for (const key in vippsData.transactionInfo) {
    propertiesArray.push({
      property: `vipps_${key}`,
      value:
        typeof vippsData.transactionInfo[key] === 'string'
          ? vippsData.transactionInfo[key]
          : vippsData.transactionInfo[key].toString()
    });
  }

  return propertiesArray;
};

module.exports = ({ vippsOrderId }, vippsData) => {
  // if !vippsOrderId we set to create an order in Crystallize
  const {
    lineItems,
    currency,
    personalDetails,
    shippingDetails,
    userDetails
  } = vippsData;
  let totalGrossCartAmount = 0;
  let totalNetCartAmount = 0;

  if (vippsOrderId) {
    return {
      customer: {
        identifier: userDetails.ssn,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        // birthDate: new Date(userDetails.dateOfBirth),
        addresses: [
          {
            type: 'delivery',
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            street: shippingDetails.address.addressLine1,
            street2: shippingDetails.address.addressLine2,
            postalCode: shippingDetails.address.postCode,
            city: shippingDetails.address.city,
            country: shippingDetails.address.country,
            phone: userDetails.mobileNumber,
            email: userDetails.email
          }
        ]
      },
      payment: [
        {
          provider: 'custom',
          custom: {
            properties: generateVippsProperties(vippsData)
          }
        }
      ],
      id: vippsOrderId,
      additionalInformation: JSON.stringify({
        status: vippsData.transactionInfo.status
      })
    };
  } else {
    const orderItemsArray = lineItems.map(lineItem => {
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
        lastName: personalDetails.lastName
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
};
