/* eslint-disable no-underscore-dangle */
import { orderNormalizer } from 'lib-api/payment-providers/vipps';
import { createCrystallizeOrder } from 'lib-api/crystallize/order';
import getHost from 'lib-api/util/get-host';
import { vippsApiCall, vippsAccessToken } from 'lib-api/util/vipps-utils';

const { VIPPS_MERCHANT_SERIAL } = process.env;

const orderToVippsCart = (lineItems) => {
  let totalCartAmount = 0;

  for (const item of lineItems) {
    totalCartAmount += item.net;
  }

  return {
    cart: lineItems,
    totalCartAmount: totalCartAmount,
  };
};

const orderToVippsBody = (
  orderDetails,
  lineItems,
  personalDetails,
  crystallizeOrderId,
  host
) => {
  const { totalCartAmount } = orderToVippsCart(lineItems);

  return {
    merchantInfo: {
      merchantSerialNumber: VIPPS_MERCHANT_SERIAL,
      callbackPrefix: `${host}/api/vipps/order-persistence`,
      shippingDetailsPrefix: host,
      fallBack: `${host}/api/confirmation/vipps`,
      consentRemovalPrefix: `${host}/consent`,
      paymentType: 'eComm Express Payment',
      fallBack: host,
      isApp: false,
      staticShippingDetails: [
        {
          isDefault: 'Y',
          priority: 0,
          shippingCost: 10.0,
          shippingMethod: 'Posten Servicepakke',
          shippingMethodId: 'posten-servicepakke',
        },
      ],
    },
    customerInfo: { mobileNumber: 91234567 },
    transaction: {
      orderId: crystallizeOrderId,
      amount: totalCartAmount,
      transactionText: 'Crystallize Boilerplate Test Transaction',
    },
  };
};

export default async (req, res) => {
  try {
    const { personalDetails, lineItems, currency } = req.body;
    const { metadata } = req.body;
    const host = getHost(req);

    const validCrystallizeOrder = orderNormalizer({
      vippsData: { lineItems, currency, personalDetails },
    });

    const createCrystallizeOrderResponse = await createCrystallizeOrder(
      validCrystallizeOrder
    );

    const vippsResponse = await vippsApiCall({
      uri: '/ecomm/v2/payments',
      body: orderToVippsBody(
        req.body,
        lineItems,
        personalDetails,
        createCrystallizeOrderResponse.data.orders.create.id,
        host
      ),
    });
    console.log(
      vippsResponse,
      orderToVippsBody(
        req.body,
        lineItems,
        personalDetails,
        createCrystallizeOrderResponse.data.orders.create.id,
        host
      )
    );
    return res.send(vippsResponse);
  } catch (error) {
    console.log(error);
    return res.status(503).send({
      success: false,
      error: error.stack,
    });
  }
};
