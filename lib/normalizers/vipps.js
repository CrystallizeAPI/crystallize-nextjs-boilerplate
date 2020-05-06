module.exports = ({ vippsOrderId }, vippsData) => {
  // if !vippsOrderId we set to create an order in Crystallize
  const { lineItems, currency } = vippsData;
  let totalGrossCartAmount = 0;
  let totalNetCartAmount = 0;

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
  if (vippsOrderId) {
    return {
      id: vippsOrderId,
      additionalInformation: JSON.stringify({ status: 'acknowledged' })
    };
  } else {
    return {
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
