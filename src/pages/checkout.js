import appConfig, { isMultilingual } from 'lib/app-config';

export function getStaticProps() {
  return { props: {} };
}

export const getStaticPaths = !isMultilingual
  ? undefined
  : () => {
      return {
        paths: appConfig.locales.map((l) => `/${l.urlPrefix}/checkout`),
        fallback: false
      };
    };

export { default } from 'page-components/checkout';
