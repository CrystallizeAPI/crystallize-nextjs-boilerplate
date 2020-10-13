import { client, orderDenormalizer } from 'lib-api/payment-providers/klarna';
export { default } from 'page-components/checkout/confirmation';

export async function getServerSideProps({ query: { orderId } }) {
  const { response } = await client.checkoutV3.retrieveOrder(orderId);

  return {
    props: {
      order: response ? orderDenormalizer(response) : null
    }
  };
}
