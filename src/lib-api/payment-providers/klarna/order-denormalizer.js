// Maps klarna order fetch result to Crystallize getOrder query result
export default function klarnaOrderDenormalizer(orderData) {
  const denormalizedCart = orderData.order_lines.map(
    ({
      name,
      quantity,
      unit_price,
      total_amount,
      total_tax_amount,
      ...orderLine
    }) => {
      return {
        sku: orderLine.reference || null,
        name,
        quantity,
        price: {
          net: (total_amount - total_tax_amount) / quantity / 100,
          gross: unit_price / 100,
          currency: orderLine.purchase_currency || null
        },
        imageUrl: orderLine.image_url || null
      };
    }
  );

  return {
    data: {
      orders: {
        get: {
          total: {
            status: orderData.status,
            // html_snippet: orderData.html_snippet,
            net: denormalizedCart.reduce(
              (acc, item) => acc + item.price.net * item.quantity,
              0
            ),
            gross: orderData.order_amount / 100,
            currency: orderData.purchase_currency || null
          },
          payment: {
            provider: 'klarna',
            id: orderData.order_id,
            orderId: orderData.order_id,
            recurringToken: orderData.recurring_token || null
          },
          cart: denormalizedCart,
          customer: {
            firstName: orderData.billing_address.given_name,
            lastName: orderData.billing_address.family_name,
            addresses: [
              {
                type: 'billing',
                street: orderData.billing_address.street_address,
                street2: orderData.billing_address.street_address2,
                email: orderData.billing_address.email
              },
              {
                type: 'shipping',
                street: orderData.shipping_address.street_address,
                street2: orderData.shipping_address.street_address2,
                email: orderData.shipping_address.email
              }
            ]
          }
        }
      }
    }
  };
}
