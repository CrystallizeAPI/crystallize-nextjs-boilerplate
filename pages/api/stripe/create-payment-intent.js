const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeSecretKey);
const { validateItems } = require('../../../lib/util/cart-validation');

export default async (req, res) => {
  const { lineItems } = JSON.parse(req.body);

  const validatedItems = await validateItems(lineItems);

  const amount = validatedItems.reduce((acc, val) => {
    return acc + val.price * val.quantity;
  }, 0);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'nok'
  });

  return res.json(paymentIntent);
};
