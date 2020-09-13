import { getClient } from 'lib-api/payment-providers/vipps';
import { updateCrystallizeOrder } from 'lib-api/crystallize/order';

export default async (req, res) => {
  const {
    order: { get: order }
  } = req.body;

  const inStages = order.pipelines.map(({ pipeline, stageId }) => ({
    pipeline: pipeline.name,
    stage: pipeline.stages?.find((s) => s.id === stageId)?.name
  }));

  console.log('Order pipeline update for', order.id);
  console.log('The order is in', inStages.length, 'pipeline(s)');
  console.log(inStages);

  const actions = [];

  const inStorePipeline = inStages.find(
    (p) => p.pipeline === 'In store pickup'
  );
  if (inStorePipeline) {
    switch (inStorePipeline.stage) {
      case 'New':
        actions.push('Notify staff of new order');
        break;
      case 'Packing':
        actions.push('Inform the user: packing begun');
        break;
      case 'Ready':
        actions.push('Inform the user: ready for pickup');
        break;
      case 'Delivered':
        // Vipps capture
        await getClient().capture({
          orderId: order.id,
          body: {
            merchantInfo: {
              merchantSerialNumber: process.env.VIPPS_MERCHANT_SERIAL
            },
            transaction: {
              amount: order.total.gross * 100,
              transactionText: 'Crystallize Boilerplate Test Transaction'
            }
          }
        });

        await updateCrystallizeOrder({
          id: order.id,
          additionalInformation: JSON.stringify({
            status: 'CAPTURED'
          })
        });

        break;
      case 'Cancelled':
        await getClient().refund({
          orderId: order.id,
          body: {
            merchantInfo: {
              merchantSerialNumber: process.env.VIPPS_MERCHANT_SERIAL
            },
            transaction: {
              amount: order.total.gross * 100,
              transactionText: 'Crystallize Boilerplate Test Refund'
            }
          }
        });

        await updateCrystallizeOrder({
          id: order.id,
          additionalInformation: JSON.stringify({
            status: 'REFUNDED'
          })
        });
    }
  }

  res.send('received');
};
