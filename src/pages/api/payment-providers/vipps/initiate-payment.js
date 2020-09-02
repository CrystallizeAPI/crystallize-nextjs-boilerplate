import { validatePaymentModel } from 'lib-api/util/checkout';
import { orderNormalizer } from 'lib-api/payment-providers/vipps';
import { createCrystallizeOrder } from 'lib-api/crystallize/order';
import getHost from 'lib-api/util/get-host';
import { getClient } from 'lib-api/payment-providers/vipps';

function orderToVippsBody({ paymentModel, orderId, host }) {
  return {
    merchantInfo: {
      merchantSerialNumber: process.env.VIPPS_MERCHANT_SERIAL,
      callbackPrefix: `${host}/api/payment-providers/vipps/order-update`,
      shippingDetailsPrefix: host,
      fallBack: `${host}/api/payment-providers/vipps/fallback/${orderId}?multilingualUrlPrefix=${paymentModel.multilingualUrlPrefix}`,
      consentRemovalPrefix: `${host}/api/payment-providers/vipps/constent-removal`,
      paymentType: 'eComm Express Payment',
      isApp: false,
      staticShippingDetails: [
        // Provide a default shipping method
        {
          isDefault: 'Y',
          priority: 0,
          shippingCost: 0,
          shippingMethod: 'Posten Servicepakke',
          shippingMethodId: 'posten-servicepakke'
        }
      ]
    },
    customerInfo: {},
    transaction: {
      orderId,
      amount: parseInt(paymentModel.total.gross * 100, 10),
      transactionText: 'Crystallize NextJS boilerplate test transaction'
    }
  };
}

export default async (req, res) => {
  try {
    const { paymentModel } = req.body;

    const validPaymentModel = await validatePaymentModel({ paymentModel });
    const host = getHost(req);

    const createCrystallizeOrderResponse = await createCrystallizeOrder(
      orderNormalizer({
        paymentModel: validPaymentModel
      })
    );

    const vippsResponse = await getClient().initiatePayment({
      order: orderToVippsBody({
        paymentModel: validPaymentModel,
        orderId: createCrystallizeOrderResponse.data.orders.create.id,
        host
      })
    });

    return res.send(vippsResponse);
  } catch (error) {
    console.log(error);
    return res.status(503).send({
      success: false,
      error: error.stack
    });
  }
};
