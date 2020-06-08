/* eslint-disable no-underscore-dangle */
import { orderNormalizer } from 'lib-api/payment-providers/vipps';
import { createCrystallizeOrder } from 'lib-api/crystallize/order';
import getHost from 'lib-api/util/get-host';
import { getClient } from 'lib-api/payment-providers/vipps';

const { VIPPS_MERCHANT_SERIAL } = process.env;

const orderToVippsCart = (lineItems) => {
  let totalCartAmount = 0;

  for (const item of lineItems) {
    totalCartAmount += item.net * item.quantity;
  }

  return {
    cart: lineItems,
    totalCartAmount: totalCartAmount
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
  const shippingCost = 0;
  return {
    merchantInfo: {
      merchantSerialNumber: VIPPS_MERCHANT_SERIAL,
      callbackPrefix: `${host}/api/vipps/order-persistence`,
      shippingDetailsPrefix: host,
      fallBack: `${host}/confirmation/vipps/${crystallizeOrderId}`,
      consentRemovalPrefix: `${host}/consent`,
      paymentType: 'eComm Express Payment',
      isApp: false,
      staticShippingDetails: [
        {
          isDefault: 'Y',
          priority: 0,
          shippingCost: shippingCost,
          shippingMethod: 'Posten Servicepakke',
          shippingMethodId: 'posten-servicepakke'
        }
      ]
    },
    customerInfo: {},
    transaction: {
      orderId: crystallizeOrderId,
      amount: totalCartAmount * 100, //Vipps stores int for transaction amount (2 decimals)
      transactionText: 'Crystallize Boilerplate Test Transaction'
    }
  };
};

export default async (req, res) => {
  try {
    const { personalDetails, lineItems, currency } = req.body;
    const { metadata } = req.body;
    const host = getHost(req);

    const validCrystallizeOrder = orderNormalizer({
      vippsData: { lineItems, currency, personalDetails }
    });

    const createCrystallizeOrderResponse = await createCrystallizeOrder(
      validCrystallizeOrder
    );

    const vippsResponse = await getClient().initiatePayment({
      order: orderToVippsBody(
        req.body,
        lineItems,
        personalDetails,
        createCrystallizeOrderResponse.data.orders.create.id,
        host
      )
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
