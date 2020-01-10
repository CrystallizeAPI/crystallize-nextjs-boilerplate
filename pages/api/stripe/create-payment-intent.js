const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { validateItems } = require('../../../lib/util/cart-validation');

export default async (req, res) => {
  try {
    const { lineItems, currency } = req.body;
    const validatedItems = await validateItems(lineItems);
    const amount = validatedItems.reduce((acc, val) => {
      return acc + val.price * val.quantity;
    }, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency
    });

    return res.json(paymentIntent);
  } catch (error) {
    return res.status(503).send({
      success: false,
      error: error.stack
    });
  }
};
