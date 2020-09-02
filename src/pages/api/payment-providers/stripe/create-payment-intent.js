import { getClient } from 'lib-api/payment-providers/stripe';
import { validatePaymentModel } from 'lib-api/util/checkout';

export default async (req, res) => {
  try {
    const { paymentModel } = req.body;
    const validPaymentModel = await validatePaymentModel({ paymentModel });

    const paymentIntent = await getClient().paymentIntents.create({
      amount: validPaymentModel.total.gross * 100,
      currency: validPaymentModel.locale.defaultCurrency
    });

    return res.json(paymentIntent);
  } catch (error) {
    return res.status(503).send({
      success: false,
      error: error.stack
    });
  }
};
