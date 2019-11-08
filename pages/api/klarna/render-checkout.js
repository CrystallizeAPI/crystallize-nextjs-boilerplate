/* eslint-disable no-underscore-dangle */
const config = require('../../../config');
const klarnaApiCall = require('../../../lib/util/klarna-utils');

const { NGROK_URL, HOST_URL, COUNTRY_CODE, CHECKOUT_URI, TERMS_URI } = config;

const orderToKlarnaCart = lineItems => {
  let totalTaxAmount = 0;
  let totalCartAmount = 0;
  const cartItems = lineItems.map(item => {
    totalTaxAmount += item.product_tax_amount * 100;
    // Klarna expects integers
    const amount = item.net * 100 * item.quantity;
    totalCartAmount += amount;

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
        taxGroup: item.tax_group
      }),
      image_url: item.image_url,
      total_amount: amount,
      total_tax_amount: item.product_tax_amount * 100
      // amount - (amount * 10000) / (10000 + item.tax_rate * 100)
    };
  });
  return {
    cart: cartItems,
    total_cart_tax_amount: totalTaxAmount,
    total_cart_amount: totalCartAmount
  };
};

export default async (req, res) => {
  try {
    const { lineItems, currency } = req.body;
    const { metadata } = req.body;
    // const amount = lineItems.reduce((acc, val) => {
    //  return acc + val.net * 100 * val.quantity;
    // }, 0);
    const klarnaCartInfo = orderToKlarnaCart(lineItems);

    const response = await klarnaApiCall({
      method: 'POST',
      uri: '/checkout/v3/orders',
      body: {
        order_lines: klarnaCartInfo.cart,
        purchase_country: COUNTRY_CODE,
        purchase_currency: currency,
        // locale: 'nb-no',
        order_amount: klarnaCartInfo.total_cart_amount,
        order_tax_amount: klarnaCartInfo.total_cart_tax_amount,
        merchant_data: metadata,
        merchant_urls: {
          // back_to_store_uri: STORE_URI,
          terms: TERMS_URI,
          checkout: CHECKOUT_URI,
          confirmation: `${HOST_URL}/confirmation/klarna/{checkout.order.id}`,
          push: `${NGROK_URL}/api/order-persistence?klarna_order_id={checkout.order.id}`
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
