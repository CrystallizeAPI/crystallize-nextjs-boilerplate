import { getClient, orderDenormalizer } from 'lib-api/payment-providers/klarna';
// export { default } from 'page-components/checkout/confirmation';

export async function getServerSideProps({ query: { orderId } }) {
  const { order } = await getClient().getOrder(orderId);

  // Get Crystallize order

  // const order = await fetchCrystallizeOrder(orderId);
  console.log(order);

  return {
    props: {}
  };

  return {
    props: {
      order: order ? orderDenormalizer(order) : null
    }
  };
}

export default () => 'hei';
