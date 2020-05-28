import { validateItems } from 'lib-api/util/cart-validation';
import { getClient } from 'lib-api/payment-providers/stripe';

export default async (req, res) => {
  try {
    const { lineItems, currency } = req.body;
    const validatedItems = await validateItems(lineItems);
    const amount = validatedItems.reduce((acc, val) => {
      return acc + val.price * val.quantity;
    }, 0);

    const paymentIntent = await getClient().paymentIntents.create({
      amount: amount * 100,
      currency,
    });

    return res.json(paymentIntent);
  } catch (error) {
    return res.status(503).send({
      success: false,
      error: error.stack,
    });
  }
};
