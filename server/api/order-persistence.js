const {
  createCrystallizeOrder
} = require('../../lib/crystallize-order-handler');
const { orderQueryNormalizer } = require('../../lib/order-normalizer');
const klarnaOrderAcknowledger = require('../../lib/util/klarna-order-acknowledger');

module.exports = async (req, res) => {
  // TODO: Handle understanding the payment method by some body fields e.g. stripe has customer_id
  let paymentMethod;
  let response;
  const data = req.body;

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
