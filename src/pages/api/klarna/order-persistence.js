import { createCrystallizeOrder } from 'lib-api/crystallize/order';
import { client, orderNormalizer } from 'lib-api/payment-providers/klarna';
import { emailOrderConfirmation } from 'lib-api/emails';

export default async (req, res) => {
  try {
    const klarnaOrderId = req.query.klarna_order_id;

    const validCrystallizeOrder = await orderNormalizer({
      klarnaOrderId,
    });

    const createCrystallizeOrderResponse = await createCrystallizeOrder(
      validCrystallizeOrder
    );

    await client.acknowledgeOrder(klarnaOrderId);

    await emailOrderConfirmation(createCrystallizeOrderResponse);

    return res.status(200).send({
      success: true,
      ...createCrystallizeOrderResponse,
    });
  } catch (error) {
    return res.status(503).send({
      success: false,
      error: error.stack,
    });
  }
};
