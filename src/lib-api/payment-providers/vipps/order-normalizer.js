function generateVippsProperties(vippsData) {
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
      value: vippsData.transactionInfo[key]?.toString()
    });
  }

  return propertiesArray;
}

export default function VippsOrderNormalizer({
  vippsOrderId,
  vippsData,
  paymentModel
}) {
  // If we don't get a vippsOrderId we need to create an order in Crystallize
  if (vippsOrderId) {
    const { shippingDetails, userDetails } = vippsData;
    return {
      id: vippsOrderId,
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
      additionalInformation: JSON.stringify({
        status: vippsData.transactionInfo.status
      })
    };
  } else {
    const { cart, customer, total } = paymentModel;

    return {
      customer,
      cart,
      total,
      additionalInformation: JSON.stringify({ status: 'initiated' })
    };
  }
}
