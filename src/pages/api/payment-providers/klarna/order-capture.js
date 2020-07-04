/**
 * An example of how to capture amount reserved on an
 * order. You would typically do this as a response to
 * an update of a Fulfilment Pipelane Stage change in
 * Crystallize (https://crystallize.com/learn/developer-guides/order-api/fulfilment-pipelines)
 */

import { getClient } from 'lib-api/payment-providers/klarna';

export default async (req, res) => {
  try {
    const klarnaOrderId = req.query.id;

    const { success, ...rest } = await getClient().captureOrder(klarnaOrderId);

    return res.status(200).send({
      success,
      ...rest
    });
  } catch (error) {
    return res.status(503).send({
      success: false,
      error: error.stack
    });
  }
};
