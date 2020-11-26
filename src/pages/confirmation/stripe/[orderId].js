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
      const response = await fetchProduct({
        id: cartItem.productId,
        language: 'en'
      });

      const defaultVariant = response?.data?.product?.get?.defaultVariant;

      defaultVariant.images = defaultVariant.images.map((image) => ({
        key: image.key
      }));
      const urt = await updateProductStock({
        id: cartItem.productId,
        language: 'en',
        variants: [{ ...defaultVariant, stock: 0 }]
      });

      await publishProduct({
        id: cartItem.productId,
        language: 'en'
      });
    }
  }

  return {
    props: {
      order
    }
  };
}
