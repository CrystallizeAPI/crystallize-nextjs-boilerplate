/* eslint-disable no-underscore-dangle */
import getHost from 'lib-api/util/get-host';
import { getClient, orderNormalizer } from 'lib-api/payment-providers/mollie';
import { createCrystallizeOrder } from 'lib-api/crystallize/order';
import { validatePaymentModel } from 'lib-api/util/checkout';

function orderTomollieBody({
  multilingualUrlPrefix,
  basket,
  locale,
  total,
  customerId,
  host,
  orderId
}) {
  return {
    amount: {
      currency: locale.defaultCurrency,
      value: `${total.gross.toFixed(2)}`
    },
    customerId,
    sequenceType: 'first',
    description: 'Mollie test transaction',
    redirectUrl: `${host}${multilingualUrlPrefix}/confirmation/mollie/${orderId}`,
    webhookUrl: `${host}/api/payment-providers/mollie/order-update`,
    metadata: { crystallizeOrderId: orderId, basket: basket.lineItems }
  };
}

export default async (req, res) => {
  try {
    const { paymentModel } = req.body;
    const { multilingualUrlPrefix, customer, locale } = paymentModel;

    const validPaymentModel = await validatePaymentModel({ paymentModel });
    const host = getHost(req);

    const mollieCustomer = await getClient().customers.create({
      name: `${customer.firstName} ${customer.lastName}`,
      email: customer.addresses[0].email
    });

    // disable if you want subscriptions
    const validCrystallizeOrder = orderNormalizer({
      validPaymentModel
    });
    // disable if you want subscriptions
    const createCrystallizeOrderResponse = await createCrystallizeOrder(
      validCrystallizeOrder
    );

    // swap with subscriptions if you want to activate a subscription for a customer
    const mollieResponse = await getClient().payments.create(
      orderTomollieBody({
        multilingualUrlPrefix,
        basket: validPaymentModel.cart,
        locale,
        total: validPaymentModel.total,
        orderId: createCrystallizeOrderResponse.data.orders.create.id,
        customerId: mollieCustomer.id,
        host
      })
    );

    // enable if you want subscriptions
    // await getClient().customers_mandates.get(mollieResponse.mandateId, {
    //   customerId: mollieCustomer.id
    // });
    // const customStartingDate = () => {
    //   const startDate = new Date();
    //   startDate.setDate(startDate.getDate() + 15);
    //   return startDate.toISOString().split('T')[0];
    // };

    // await getClient().customers_subscriptions.create({
    //   customerId: mollieCustomer.id,
    //   amount: orderTomollieBody({
    //     basket: req.body,
    //     customer,
    //     orderId: createCrystallizeOrderResponse.data.orders.create.id,
    //     customerId: mollieCustomer.id,
    //     host
    //   }).amount,
    //   times: 1,
    //   interval: '1 month',
    //   startDate: customStartingDate(),
    //   description: 'Mollie Test subscription',
    //   webhookUrl: `${host}/api/payment-providers/mollie/subscription-renewal`,
    //   metadata: {
    //     basket: req.body.lineItems,
    //     crystallizeOrderId: createCrystallizeOrderResponse.data.orders.create.id
    //   }
    // });

    return res.send(mollieResponse._links.checkout);
  } catch (error) {
    console.log(error);
    return res.status(503).send({
      success: false,
      error: error.stack
    });
  }
};
