import Cmp, { getData } from 'page-components/index';
import * as lang from 'lib/language';

export async function getStaticProps({
  params: { language = lang.defaultLanguage } = {}
}) {
  const data = await getData({ asPath: '/', language });

  return {
    props: {
      ...data
    },
    unstable_revalidate: 1
  };
}

export const getStaticPaths = !lang.isMultilingual
  ? undefined
  : async () => {
      const languages = lang.getLanguages();

      return {
        paths: languages.map((l) => `/${l}`),
        fallback: false
      };
    };

export default Cmp;
