/* eslint-disable no-underscore-dangle */
const config = require('../../../config');
const klarnaApiCall = require('../../../lib/util/klarna-utils');

const { NGROK_URL } = config;

const orderToKlarnaCart = lineItems => {
  return lineItems.map(item => {
    // Klarna expects integers
    const amount = item.net * 100 * item.quantity;
    return {
      name: item.name,
      reference: item.sku,
      quantity: item.quantity,
      tax_rate: item.tax_rate * 100 || 0,
      discount_rate: item.discount_rate * 100 || 0,
      unit_price: item.net * 100,
      merchant_data: JSON.stringify({
        productId: item.product_id,
        productVariantId: item.product_variant_id
      }),
      image_url: item.image_url,
      total_amount: amount,
      total_tax_amount: 0
      // amount - (amount * 10000) / (10000 + item.tax_rate * 100)
    };
  });
};

export default async (req, res) => {
  try {
    const { lineItems } = req.body;
    const { metadata } = req.body;

    const amount = lineItems.reduce((acc, val) => {
      return acc + val.net * 100 * val.quantity;
    }, 0);

    const response = await klarnaApiCall({
      method: 'POST',
      uri: '/checkout/v3/orders',
      body: {
        order_lines: orderToKlarnaCart(lineItems),
        purchase_country: 'NO',
        purchase_currency: 'NOK',
        locale: 'nb-no',
        order_amount: amount,
        order_tax_amount: 0,
        merchant_data: metadata,
        merchant_urls: {
          // back_to_store_uri: STORE_URI,
          terms: 'http://google.com',
          checkout: `http://google.com`,
          confirmation: `${NGROK_URL}/`,
          push: `${NGROK_URL}/api/order-confirmation?klarna_order_id={checkout.order.id}`
        }
      }
    });
    return res.send(`
    <html>
      <head><!-- ... --></head>
      <body>
      <!-- Your checkout page html -->
      ${response.html_snippet}
      <!-- More of your checkout page html -->
      </body>
     </html>
      `);
  } catch (error) {
    return res.json({
      success: false,
      error: error.stack
    });
  }
};
