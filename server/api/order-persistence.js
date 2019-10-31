const {
  createCrystallizeOrder
} = require('../../lib/crystallize-order-handler');
const { orderQueryNormalizer } = require('../../lib/order-normalizer');
const klarnaOrderAcknowledger = require('../../lib/util/klarna-order-acknowledger');

module.exports = async (req, res) => {
  // TODO: Handle understanding the payment method by some body fields e.g. stripe has customer_id
  let paymentMethod;
  const data = req.body;
  try {
    const paymentIntent = data.payment_intent;
    // @extraStripe
    const sig = req.headers['stripe-signature'];

    if (paymentIntent || sig) paymentMethod = 'stripe';
    if (data.merchant_urls) paymentMethod = 'klarna';

    const mutationBody = await orderQueryNormalizer(data, paymentMethod, {
      // @extraStripe
      stripeSignature: sig,

      paymentIntentId: paymentIntent,
      stripeRawBody: req.rawBody,
      klarnaOrderId: req.params.klarna_order_id
    });
    const response = await createCrystallizeOrder(mutationBody);

    if (paymentMethod === 'klarna')
      await klarnaOrderAcknowledger(req.params.klarna_order_id);

    res.status(200).send({
      success: true,
      ...response
    });
  } catch (error) {
    res.status(503).send({
      success: false,
      ...error
    });
  }
};
