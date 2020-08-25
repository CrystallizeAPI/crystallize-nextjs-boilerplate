import { createCrystallizeOrder } from 'lib-api/crystallize/order';
import { emailOrderConfirmation } from 'lib-api/emails';
import { orderNormalizer } from 'lib-api/payment-providers/stripe';

export default async (req, res) => {
  try {
    const { paymentIntentId, lineItems, personalDetails } = req.body;

    const validCrystallizeOrder = await orderNormalizer({
      paymentIntentId,
      lineItems,
      personalDetails
    });

    const createCrystallizeOrderResponse = await createCrystallizeOrder(
      validCrystallizeOrder
    );

    await emailOrderConfirmation(
      createCrystallizeOrderResponse.data.orders.create.id
    );

    return res.status(200).send({
      success: true,
      ...createCrystallizeOrderResponse
    });
  } catch (error) {
    return res.status(503).send({
      success: false,
      error: error.stack
    });
  }
};
