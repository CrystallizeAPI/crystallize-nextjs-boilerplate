import { getClient, orderNormalizer } from 'lib-api/payment-providers/mollie'
import { createCrystallizeOrder } from 'lib-api/crystallize/order'

export default async (req, res) => {
  const {
    body: { id }
  } = req
  try {
    const molliePayment = await getClient().payments.get(id)
    const customerData = await getClient().customers.get(
      molliePayment.customerId
    )

    const validCrystallizeOrder = orderNormalizer({
      orderData: molliePayment,
      customerData
    })

    const createCrystallizeOrderResponse = await createCrystallizeOrder(
      validCrystallizeOrder
    )

    res.status(200).send(createCrystallizeOrderResponse)
  } catch (err) {
    console.log(err)
    res.status(503).send(err)
  }
}
