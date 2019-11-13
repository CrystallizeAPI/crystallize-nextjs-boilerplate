import { createCrystallizeOrder } from 'lib/crystallize-order-handler';
import { orderQueryNormalizer } from 'lib/order-normalizer';
import { emailOrderConfirmation } from 'lib/emails';
import klarnaOrderAcknowledger from 'lib/util/klarna-order-acknowledger';

// TODO: Remove body parsing once zeit has updated error handling
// @RemoveWhenZeitErrorHandledComplete
const bodyParser = request => {
  return new Promise(resolve => {
    let data = '';
    request.on('data', chunk => {
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
  // TODO: Handle understanding the payment method by some body fields e.g. stripe has customer_id
  let paymentMethod;
  let response;
  const data = await bodyParser(req);

  try {
    const { paymentIntentId } = data;

    // @extraStripe
    const sig = req.headers['stripe-signature'];

    if (paymentIntentId || sig) paymentMethod = 'stripe';
    if (req.query.klarna_order_id) paymentMethod = 'klarna';

    if (!paymentMethod) {
      return res.status(200).send({
        success: true,
        message: 'No payment method seems to be selected'
      });
    }

    const mutationBody = await orderQueryNormalizer(data, paymentMethod, {
      // @extraStripe
      stripeSignature: sig,

      paymentIntentId,
      stripeRawBody: req.rawBody,
      klarnaOrderId: req.query.klarna_order_id
    });

    response = await createCrystallizeOrder(mutationBody);

    if (paymentMethod === 'klarna')
      await klarnaOrderAcknowledger(req.query.klarna_order_id);

    await emailOrderConfirmation(response.data.orders.create.id);
  } catch (error) {
    return res.status(503).send({
      success: false,
      error: error.stack
    });
  }
  return res.status(200).send({
    success: true,
    ...response
  });
};

// @RemoveWhenZeitErrorHandledComplete
export const config = {
  api: {
    bodyParser: false
  }
};
