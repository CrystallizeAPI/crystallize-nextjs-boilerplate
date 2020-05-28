import { createCrystallizeOrder } from 'lib-api/crystallize/order';
import { emailOrderConfirmation } from 'lib-api/emails';
import { orderNormalizer } from 'lib-api/payment-providers/stripe';

// TODO: Remove body parsing once Vercel has updated error handling
// @RemoveWhenVercelErrorHandledComplete
const bodyParser = (request) => {
  return new Promise((resolve) => {
    let data = '';
    request.on('data', (chunk) => {
      data += chunk;
    });
    request.on('end', () => {
      try {
        const body = JSON.parse(data);
        resolve(body);
      } catch (error) {
        resolve({});
      }
    });
  });
};

export default async (req, res) => {
  try {
    const { paymentIntentId, lineItems } = await bodyParser(req);

    const validCrystallizeOrder = await orderNormalizer({
      paymentIntentId,
      lineItems,
    });

    const createCrystallizeOrderResponse = await createCrystallizeOrder(
      validCrystallizeOrder
    );

    await emailOrderConfirmation(
      createCrystallizeOrderResponse.data.orders.create.id
    );

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

// @RemoveWhenVercelErrorHandledComplete
export const config = {
  api: {
    bodyParser: false,
  },
};
