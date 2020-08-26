import mjml2html from '@nerdenough/mjml-ncc-bundle';

import { callOrdersApi } from 'lib-api/crystallize';
import QUERY_ORDER_BY_ID from 'lib-api/crystallize/graph/queries/order-by-id';
import { formatCurrency } from 'lib/currency';

import { sendEmail } from './utils';

export default async function sendOrderConfirmation(orderId) {
  try {
    const response = await callOrdersApi({
      query: QUERY_ORDER_BY_ID,
      variables: {
        id: orderId
      },
      operationName: 'getOrder'
    });
    const order = response.data.orders.get;
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
                  amount: order.total.gross,
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
                (item) => `<tr>
                  <td style="padding: 0 15px 0 0;">${item.name} (${
                  item.sku
                })</td>
                  <td style="padding: 0 15px;">${item.quantity}</td>
                  <td style="padding: 0 0 0 15px;">${formatCurrency({
                    amount: item.price.gross * item.quantity,
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

    await sendEmail({
      to: email,
      from: 'example@crystallize.com',
      subject: 'Order Summary',
      html
    });
  } catch (error) {
    Promise.resolve(error.stack);
  }
}
