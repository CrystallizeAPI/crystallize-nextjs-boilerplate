import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ServiceApi from 'lib/service-api';
export { default } from 'page-components/checkout/confirmation';

export async function getServerSideProps({ locale, query: { orderId } }) {
  const response = await ServiceApi({
    query: `
      {
        orders {
          get(id: "${orderId}")
        }
      }
    `
  });

  return {
    props: {
      order: response.data.orders.get,
      ...(await serverSideTranslations(locale, [
        'common',
        'basket',
        'checkout'
      ]))
    }
  };
}
