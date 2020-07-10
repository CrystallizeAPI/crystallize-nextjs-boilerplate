import { updateCrystallizeOrder } from 'lib-api/crystallize/order';
import { emailOrderConfirmation } from 'lib-api/emails';
import { orderNormalizer } from 'lib-api/payment-providers/vipps';

export default async (req, res) => {
  try {
    const orderId = req.query.orderId[req.query.orderId.length - 1];

    const validCrystallizeOrder = await orderNormalizer({
      vippsOrderId: orderId,
      vippsData: req.body
    });

    const updateCrystallizeOrderResponse = await updateCrystallizeOrder(
      validCrystallizeOrder
    );

    await emailOrderConfirmation(
      updateCrystallizeOrderResponse.data.order.update.id
    );

    return res.status(200).send({
      success: true,
      ...updateCrystallizeOrderResponse
    });
  } catch (error) {
    console.log(error);
    return res.status(503).send({
      success: false,
      error: error.stack
    });
  }
};
