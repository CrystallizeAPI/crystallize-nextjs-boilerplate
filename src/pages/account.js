import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export { default } from 'page-components/account';

import nextI18NextConfig from '../../next-i18next.config.js';

export async function getServerSideProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale,
        ['common', 'basket', 'customer'],
        nextI18NextConfig
      ))
    }
  };
}
