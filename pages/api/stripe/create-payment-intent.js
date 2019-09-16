const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeSecretKey);

export default async (req, res) => {
  // TODO fetch product prices separately - it's not ideal to rely on the
  // frontend to pass them through as they can easily be manipulated.

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: 'nok'
  });

  return res.json({ clientSecret: paymentIntent.client_secret });
};
