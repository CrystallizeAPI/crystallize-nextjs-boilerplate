import { getClient } from 'lib-api/payment-providers/klarna';
import getHost from 'lib-api/util/get-host';

function orderToKlarnaCart(lineItems) {
  let order_tax_amount = 0;
  let order_amount = 0;

  const order_lines = lineItems.map((item) => {
    order_tax_amount += item.product_tax_amount * 100;

    // Klarna represents numbers as number * 100
    // Ex: 11.59 becomes 1159. 9 becomes 900
    const amount = item.net * 100 * item.quantity;
    order_amount += amount;

    return {
      name: item.name,
      reference: item.sku,
      quantity: item.quantity,
      tax_rate: item.tax_group.percent * 100 || 0,
      discount_rate: item.discount_rate * 100 || 0,
      unit_price: item.net * 100,
      merchant_data: JSON.stringify({
        productId: item.product_id,
        productVariantId: item.product_variant_id,
        taxGroup: item.tax_group,
      }),
      image_url: item.image_url,
      total_amount: amount,
      total_tax_amount: item.product_tax_amount * 100,
    };
  });

  return {
    order_lines,
    order_tax_amount,
    order_amount,
  };
}

export default async (req, res) => {
  try {
    const { lineItems, currency } = req.body;
    const host = getHost(req);

    const { success, order, error } = await getClient().createOrder({
      ...orderToKlarnaCart(lineItems),
      purchase_country: 'NO',
      purchase_currency: currency || 'NOK',
      locale: 'no-nb',
      merchant_urls: {
        terms: `${host}/checkout`,
        checkout: `${host}/checkout`,
        confirmation: `${host}/confirmation/klarna/{checkout.order.id}`,
        push: `${host}/api/klarna/order-persistence?id={checkout.order.id}`,
      },
    });

    if (success) {
      return res.json({
        success: true,
        html: order.html_snippet,
      });
    }

    return res.json({
      success: false,
      error,
    });
  } catch (error) {
    return res.json({
      success: false,
      error: error.stack,
    });
  }
};
