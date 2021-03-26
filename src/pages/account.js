import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export { default } from 'page-components/account';

export async function getServerSideProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        'common',
        'basket',
        'customer'
      ]))
    }
  };
}
