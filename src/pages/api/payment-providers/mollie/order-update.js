import { getClient, orderNormalizer } from 'lib-api/payment-providers/mollie';
import { updateCrystallizeOrder } from 'lib-api/crystallize/order';

export default async (req, res) => {
  const {
    body: { id }
  } = req;
  try {
    const molliePayment = await getClient().payments.get(id);
    const customerData = await getClient().customers.get(
      molliePayment.customerId
    );

    const validCrystallizeOrder = orderNormalizer({
      crystallizeOrderId: molliePayment.metadata.crystallizeOrderId,
      orderData: molliePayment,
      customerData
    });
    const createCrystallizeOrderResponse = await updateCrystallizeOrder(
      validCrystallizeOrder
    );

    res.status(200).send(createCrystallizeOrderResponse);
  } catch (err) {
    console.log(err);
    res.status(503).send(err);
  }
};
