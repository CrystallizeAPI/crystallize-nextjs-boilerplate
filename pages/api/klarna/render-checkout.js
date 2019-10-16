/* eslint-disable no-underscore-dangle */
const request = require('request-promise');
const config = require('../../../config');

const {
  KLARNA_USERNAME,
  KLARNA_PASSWORD,
  STORE_URI,
  TERMS_URI,
  KLARNA_CONFIRMATION_URI,
  NGROK_URL,
  KLARNA_API_URL
} = config;

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
      total_amount: amount,
      total_tax_amount: 0
      // amount - (amount * 10000) / (10000 + item.tax_rate * 100)
    };
  });
};
const createAuthKey = () =>
  Buffer.from(`${KLARNA_USERNAME}:${KLARNA_PASSWORD}`).toString('base64');

const apiCall = async orderBody => {
  return new Promise(async (resolve, reject) => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${createAuthKey()}`
      },
      uri: `${KLARNA_API_URL}/checkout/v3/orders`,
      json: true,
      method: 'POST',
      body: orderBody
    };
    request(options)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export default async (req, res) => {
  try {
    const { lineItems } = req.body;

    const amount = lineItems.reduce((acc, val) => {
      return acc + val.net * 100 * val.quantity;
    }, 0);

    const response = await apiCall({
      order_lines: orderToKlarnaCart(lineItems),
      purchase_country: 'NO',
      purchase_currency: 'NOK',
      locale: 'nb-no',
      order_amount: amount,
      order_tax_amount: 0,
      merchant_urls: {
        // back_to_store_uri: STORE_URI,
        terms: TERMS_URI,
        checkout: `${STORE_URI}/checkout`,
        confirmation: `${KLARNA_CONFIRMATION_URI}/?id={checkout.order.id}`,
        push: `${NGROK_URL}/?id={checkout.order.id}`
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
    console.log(error);
    return res.json({
      success: false,
      ...error
    });
  }
};
