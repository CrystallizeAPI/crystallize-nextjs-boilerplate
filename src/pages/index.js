import Cmp, { getData } from 'page-components/index';
import { getLocaleFromContext } from 'lib/app-config';

export async function getStaticProps({ params = {}, preview }) {
  const locale = getLocaleFromContext(params);

  const data = await getData({
    asPath: '/',
    language: locale.crystallizeCatalogueLanguage,
    preview
  });

  return {
    props: data,
    revalidate: 1
  };
}

export default Cmp;
