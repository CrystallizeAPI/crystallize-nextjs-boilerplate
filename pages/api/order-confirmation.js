import { orderRetriever } from 'lib/order-retriever';
import { orderDataDenormalizer } from 'lib/order-denormalizer';

export default async (req, res) => {
  // TODO: Handle requests with tokens from client side
  let response;
  const paymentMethod = req.query.payment_method;
  const isCrystallizeRequest = !paymentMethod;

  try {
    // @extraStripe
    const sig = req.headers['stripe-signature'];

    const orderData = await orderRetriever(
      paymentMethod,
      isCrystallizeRequest,
      {
        // @extraStripe
        stripeSignature: sig,
        // CrystallizeToken
        crystallizeToken: null,
        orderId: req.query.order_id
      }
    );

    response = orderDataDenormalizer(paymentMethod, orderData);
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
