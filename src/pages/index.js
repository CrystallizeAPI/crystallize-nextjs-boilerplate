import Cmp, { getData } from 'page-components/index';
import appConfig, {
  getLocaleFromContext,
  isMultilingual
} from 'lib/app-config';

export async function getStaticProps({ params = {}, preview }) {
  const locale = getLocaleFromContext(params);

  const data = await getData({
    asPath: '/',
    language: locale.crystallizeCatalogueLanguage,
    preview
  });

  return {
    props: {
      ...data
    },
    revalidate: 1
  };
}

export const getStaticPaths = !isMultilingual
  ? undefined
  : async () => {
      return {
        paths: appConfig.locales.map((l) => `/${l.urlPrefix}`),
        fallback: false
      };
    };

export default Cmp;
