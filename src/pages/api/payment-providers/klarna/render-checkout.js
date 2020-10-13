import { client } from 'lib-api/payment-providers/klarna';
import getHost from 'lib-api/util/get-host';
import { validatePaymentModel } from 'lib-api/util/checkout';

// Klarna represents numbers as number * 100
// Ex: 11.59 becomes 1159. 9 becomes 900

function orderToKlarnaCart({ cart, total }) {
  const order_amount = total.gross * 100;

  return {
    order_amount,
    order_tax_amount: order_amount - total.net * 100,
    order_lines: cart.map(
      ({
        quantity,
        price,
        name,
        sku,
        productId,
        productVariantId,
        imageUrl
      }) => {
        const { gross, net, tax } = price;

        const unit_price = gross * 100;
        const total_amount = unit_price * quantity;
        const total_tax_amount = total_amount - net * quantity * 100;

        return {
          name,
          reference: sku,
          unit_price,
          quantity,
          total_amount,
          total_tax_amount,
          type: 'physical',
          tax_rate: tax.percent * 100,
          image_url: imageUrl,
          merchant_data: JSON.stringify({
            productId,
            productVariantId,
            taxGroup: tax
          })
        };
      }
    )
  };
}

export default async (req, res) => {
  try {
    const { paymentModel } = req.body;

    const validPaymentModel = await validatePaymentModel({ paymentModel });
    const host = getHost(req);

    const { multilingualUrlPrefix, metadata } = paymentModel;
    const klarnaOrderId = metadata?.klarnaOrderId;
    console.log({ klarnaOrderId });
    if (klarnaOrderId) {
      const { error, response } = await client.checkoutV3.updateOrder(
        klarnaOrderId,
        {
          ...orderToKlarnaCart(validPaymentModel),
          purchase_country: 'NO',
          purchase_currency: validPaymentModel.total.currency || 'NOK',
          locale: 'no-nb',
          merchant_urls: {
            terms: `${host}${multilingualUrlPrefix}/checkout`,
            checkout: `${host}${multilingualUrlPrefix}/checkout`,
            confirmation: `${host}${multilingualUrlPrefix}/confirmation/klarna/{checkout.order.id}`,
            push: `${host}/api/payment-providers/klarna/order-persistence?id={checkout.order.id}`
          }
        }
      );

      if (!error) {
        return res.json({
          success: true,
          html: response.html_snippet,
          order_id: response.order_id
        });
      }
    }

    const { error, response } = await client.checkoutV3.createOrder({
      ...orderToKlarnaCart(validPaymentModel),
      purchase_country: 'NO',
      purchase_currency: validPaymentModel.total.currency || 'NOK',
      locale: 'no-nb',
      merchant_urls: {
        terms: `${host}${multilingualUrlPrefix}/checkout`,
        checkout: `${host}${multilingualUrlPrefix}/checkout`,
        confirmation: `${host}${multilingualUrlPrefix}/confirmation/klarna/{checkout.order.id}`,
        push: `${host}/api/payment-providers/klarna/order-persistence?id={checkout.order.id}`
      }
    });

    if (!error) {
      return res.json({
        success: true,
        html: response.html_snippet,
        order_id: response.order_id
      });
    }
    return res.json({
      success: false,
      error
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      error: error.stack
    });
  }
};
