/* eslint-disable no-underscore-dangle */
import getHost from 'lib-api/util/get-host';
import { getClient, orderNormalizer } from 'lib-api/payment-providers/mollie';
import { createCrystallizeOrder } from 'lib-api/crystallize/order';

function getTotalAmount(acc, lineItem) {
  return acc + lineItem.net * lineItem.quantity;
}

function orderTomollieBody({ basket, customerId, host, orderId }) {
  const totalCartAmount = basket.lineItems.reduce(getTotalAmount, 0);
  const shippingCost = 0;
  console.log(totalCartAmount.toFixed(2));
  return {
    amount: {
      currency: 'EUR',
      value: `${totalCartAmount.toFixed(2)}`
    },
    customerId,
    sequenceType: 'first',
    description: 'Mollie test transaction',
    redirectUrl: `${host}/confirmation/mollie/${orderId}`,
    webhookUrl: `${host}/api/payment-providers/mollie/order-update`,
    metadata: { crystallizeOrderId: orderId, basket: basket.lineItems }
  };
}

export default async (req, res) => {
  try {
    const {
      personalDetails,
      multilingualUrlPrefix,
      lineItems,
      currency
    } = req.body;
    const host = getHost(req);
    const mollieCustomer = await getClient().customers.create({
      name: `${personalDetails.firstName} ${personalDetails.lastName}`,
      email: personalDetails.email
    });

    const validCrystallizeOrder = orderNormalizer({
      lineItems,
      currency,
      personalDetails
    });

    const createCrystallizeOrderResponse = await createCrystallizeOrder(
      validCrystallizeOrder
    );

    const mollieOrderBody = orderTomollieBody({
      basket: req.body,
      personalDetails,
      orderId: createCrystallizeOrderResponse.data.orders.create.id,
      customerId: mollieCustomer.id,
      host
    });
    console.log(mollieOrderBody);
    const mollieResponse = await getClient().payments.create(mollieOrderBody);

    await getClient().customers_mandates.get(mollieResponse.mandateId, {
      customerId: mollieCustomer.id
    });

    await getClient().customers_subscriptions.create({
      customerId: mollieCustomer.id,
      amount: mollieOrderBody.amount,
      times: 2,
      interval: '1 month',
      description: 'Quarterly payment',
      webhookUrl: `${host}/api/payment-providers/mollie/order-update`,
      metadata: { basket: req.body.lineItems }
    });

    return res.send(mollieResponse._links.checkout);
  } catch (error) {
    console.log(error);
    return res.status(503).send({
      success: false,
      error: error.stack
    });
  }
};
