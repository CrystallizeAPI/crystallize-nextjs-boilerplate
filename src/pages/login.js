import * as lang from 'lib/language';

export function getStaticProps() {
  return { props: {} };
}

export const getStaticPaths = !lang.isMultilingual
  ? undefined
  : async () => {
      const languages = lang.getLanguages();

      return {
        paths: languages.map((l) => `/${l}/login`),
        fallback: false
      };
    };

export { default } from 'page-components/login';
