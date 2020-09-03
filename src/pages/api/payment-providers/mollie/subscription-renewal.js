import { getClient, orderNormalizer } from 'lib-api/payment-providers/mollie';
import { createCrystallizeOrder } from 'lib-api/crystallize/order';

export default async (req, res) => {
  const {
    body: { id }
  } = req;
  try {
    const { customerId, subscriptionId } = await getClient().payments.get(id);

    const mollieSubscription = await getClient().customers_subscriptions.get(
      subscriptionId,
      { customerId: customerId }
    );

    const customerData = await getClient().customers.get(customerId);

    const validCrystallizeOrder = orderNormalizer({
      orderData: mollieSubscription,
      customerData
    });

    const createCrystallizeOrderResponse = await createCrystallizeOrder(
      validCrystallizeOrder
    );

    res.status(200).send(createCrystallizeOrderResponse);
  } catch (err) {
    console.log(err);
    res.status(503).send(err);
  }
};
