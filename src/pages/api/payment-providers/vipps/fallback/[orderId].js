import { getClient } from 'lib-api/payment-providers/vipps';
import { updateCrystallizeOrder } from 'lib-api/crystallize/order';

export default async (req, res) => {
  try {
    const { orderId, multilingualUrlPrefix } = req.query;

    let redirectTo = `${multilingualUrlPrefix}/checkout`;

    // Retrieve the Vipps order to get transaction details
    const order = await getClient().getOrderDetails({ orderId });
    const [lastTransactionLogEntry] = order.transactionLogHistory.sort(
      (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
    );

    /**
     * If the transaction logs last entry has status
     * RESERVE, then the amount has been successfully
     * reserved on the user account, and we can show
     * the confirmation page
     */
    if (
      lastTransactionLogEntry.operation === 'RESERVE' &&
      lastTransactionLogEntry.operationSuccess
    ) {
      redirectTo = `${multilingualUrlPrefix}/confirmation/vipps/${orderId}`;

      /**
       * At this point we have user details from Vipps, which
       * makes it a good time to update the Crystallize order
       */
      const {
        userDetails: {
          userId,
          firstName,
          lastName,
          email,
          mobileNumber: phone
        } = {},
        shippingDetails: {
          address: {
            addressLine1: street,
            addressLine2: street2,
            postCode: postalCode,
            city,
            country
          } = {}
        } = {}
      } = order;

      await updateCrystallizeOrder({
        id: orderId,
        payment: [
          {
            provider: 'custom',
            custom: {
              properties: [
                {
                  property: 'PaymentProvider',
                  value: 'Vipps'
                },
                {
                  property: 'Vipps orderId',
                  value: orderId
                },
                {
                  property: 'Vipps userId',
                  value: userId
                }
              ]
            }
          }
        ],
        customer: {
          identifier: email,
          firstName,
          lastName,
          addresses: [
            {
              type: 'delivery',
              email,
              firstName,
              lastName,
              phone,
              street,
              street2,
              postalCode,
              city,
              country
            }
          ]
        }
      });
    }

    res.writeHead(307, {
      Location: redirectTo
    });
    res.end();
  } catch (error) {
    console.log(error);
    return res.status(503).send({
      success: false,
      error: error.stack
    });
  }
};
