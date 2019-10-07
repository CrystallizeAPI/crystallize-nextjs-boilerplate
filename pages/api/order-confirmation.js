const createCrystallizeOrder = require('lib/order-creator');
const { orderQueryNormalizer } = require('lib/order-normalizer');

module.exports = async (req, res) => {
  // TODO: Handle understanding the payment method by some body fields e.g. stripe has customer_id
  let paymentMethod;
  const data = req.body;
  try {
    const { paymentIntent } = data;

    // @extraStripe
    const sig = req.headers['stripe-signature'];

    if (paymentIntent || sig) paymentMethod = 'stripe';
    const mutationBody = await orderQueryNormalizer(data, paymentMethod, {
      // @extraStripe
      stripeSignature: sig,

      paymentIntentId: paymentIntent.paymentIntent.id,
      stripeRawBody: req.rawBody
    });

    const response = await createCrystallizeOrder(mutationBody);
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
