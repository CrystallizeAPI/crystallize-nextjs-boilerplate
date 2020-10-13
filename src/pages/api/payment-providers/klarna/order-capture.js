/**
 * An example of how to capture amount reserved on an
 * order. You would typically do this as a response to
 * an update of a Fulfilment Pipelane Stage change in
 * Crystallize (https://crystallize.com/learn/developer-guides/order-api/fulfilment-pipelines)
 */

import { client } from 'lib-api/payment-providers/klarna';

export default async (req, res) => {
  try {
    const klarnaOrderId = req.query.id;

    const { error, response } = await client.ordermanagementV1.captures.capture(
      klarnaOrderId
    );

    return res.status(200).send({
      success: !error,
      ...response
    });
  } catch (error) {
    return res.status(503).send({
      success: false,
      error: error.stack
    });
  }
};
