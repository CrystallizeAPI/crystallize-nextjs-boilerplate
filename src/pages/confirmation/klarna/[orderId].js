import { client, orderDenormalizer } from 'lib-api/payment-providers/klarna';
export { default } from 'page-components/checkout/confirmation';

export async function getServerSideProps({ query: { orderId } }) {
  const { order } = await client.getOrder(orderId);

  return {
    props: {
      order: order ? orderDenormalizer(order) : null,
    },
  };
}
