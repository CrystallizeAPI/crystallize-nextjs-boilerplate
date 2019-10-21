import mjml2html from '@nerdenough/mjml-ncc-bundle';
import sgMail from '@sendgrid/mail';
import { print } from 'graphql/language/printer';
import { request } from 'graphql-request';

import QUERY_ORDER_BY_ID from 'lib/graph/queries/order-by-id';

const sendGridApiKey = process.env.SENDGRID_API_KEY;
const TENANT_ID = process.env.CRYSTALLIZE_TENANT_ID;
const GRAPH_URL_BASE = process.env.CRYSTALLIZE_GRAPH_URL_BASE;

const formatCurrency = ({ amount, currency }) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
    amount
  );

module.exports = async orderId => {
  const response = await request(
    `${GRAPH_URL_BASE}/${TENANT_ID}/orders`,
    print(QUERY_ORDER_BY_ID),
    { id: orderId }
  );

  const order = response.orders.get;
  const { email } = order.customer.addresses[0];

  if (!email) {
    // Ideally an email address will always be provided, but if not...
    return;
  }

  const { html } = mjml2html(`
    <mjml>
      <mj-body>
      <mj-section>
        <mj-column>
          <mj-text>
            <h1>Order Summary</h1>
            <p>Thanks for your order! This email contains a copy of your order for your reference.</p>
            <p>
              Order Number: <strong>#${order.id}</strong>
            </p>
            <p>
              First name: <strong>${order.customer.firstName}</strong><br />
              Last name: <strong>${order.customer.lastName}</strong><br />
              Email address: <strong>${email}</strong>
            </p>
            <p>
              Total: <strong>${formatCurrency({
                amount: order.total.net,
                currency: order.total.currency
              })}</strong>
            </p>
          </mj-text>
          <mj-table>
            <tr style="border-bottom:1px solid #ecedee;text-align:left;">
              <th style="padding: 0 15px 0 0;">Name</th>
              <th style="padding: 0 15px;">Quantity</th>
              <th style="padding: 0 0 0 15px;">Total</th>
            </tr>
            ${order.cart.map(
              item => `<tr>
                <td style="padding: 0 15px 0 0;">${item.name} (${item.sku})</td>
                <td style="padding: 0 15px;">${item.quantity}</td>
                <td style="padding: 0 0 0 15px;">${formatCurrency({
                  amount: item.price.net * item.quantity,
                  currency: item.price.currency
                })}</td>
              </tr>`
            )}
          </mj-table>
        </mj-column>
      </mj-section>
      </mj-body>
    </mjml>
  `);

  if (sendGridApiKey) {
    sgMail.setApiKey(sendGridApiKey);
    await sgMail.send({
      to: email,
      from: 'example@crystallize.com',
      subject: 'Order Summary',
      html
    });
  }
};
