const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeSecretKey);

export default async (req, res) => {
  try {
    const { status } = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      description: 'An example charge',
      source: req.body
    });

    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
};
