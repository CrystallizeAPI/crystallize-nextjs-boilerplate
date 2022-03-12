import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export { default } from 'page-components/search';

import nextI18NextConfig from '../../next-i18next.config.js';

export async function getStaticProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale,
        ['common', 'basket', 'search'],
        nextI18NextConfig
      ))
    }
  };
}
