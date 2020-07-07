import appConfig, { isMultilingual } from 'lib/app-config';

export function getStaticProps() {
  return { props: {} };
}

export const getStaticPaths = !isMultilingual
  ? undefined
  : async () => {
      return {
        paths: appConfig.locales.map((l) => `/${l.urlPrefix}/login`),
        fallback: false
      };
    };

export { default } from 'page-components/login';
