const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeSecretKey);

export default async (req, res) => {
  // TODO fetch product prices separately - it's not ideal to rely on the
  // frontend to pass them through as they can easily be manipulated.
  const { amount } = JSON.parse(req.body);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'nok'
  });

  return res.json({ clientSecret: paymentIntent.client_secret });
};
