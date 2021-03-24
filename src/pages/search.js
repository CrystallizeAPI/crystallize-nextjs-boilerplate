import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export { default } from 'page-components/search';

export async function getStaticProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        'common',
        'basket',
        'search'
      ]))
    }
  };
}
