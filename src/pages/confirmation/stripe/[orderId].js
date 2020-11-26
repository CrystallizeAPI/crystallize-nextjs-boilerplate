import { fetchCrystallizeOrder } from 'lib-api/crystallize/order';
import {
  updateProductStock,
  publishProduct,
  fetchProduct
} from 'lib-api/crystallize/catalogue';
export { default } from 'page-components/checkout/confirmation';

export async function getServerSideProps({ query: { orderId } }) {
  const order = await fetchCrystallizeOrder(orderId);
  const cart = order?.data?.orders?.get?.cart;
  // Disable gift card by setting stock 0 & Publish changes

  for (const cartItem of cart) {
    if (cartItem.sku.includes('gift-card')) {
      const response = fetchProduct({
        id: cartItem.productId,
        language: 'en'
      });
      console.log(response?.data?.product?.get?.defaultVariant);

      // await updateProductStock({
      //   id: cartItem.productId,
      //   language: 'en',
      //   variants: [
      //     {
      //       isDefault: true,
      //       id: cartItem.productVariantId,
      //       sku: cartItem.sku,
      //       stock: 0,
      //       price: cartItem.price.gross,
      //       key: cartItem.image
      //     }
      //   ]
      // });
      // await publishProduct({
      //   id: cartItem.productId,
      //   language: 'en'
      // });
    }
  }

  return {
    props: {
      order
    }
  };
}
