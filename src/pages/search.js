import Cmp, { getData } from 'page-components/search';
import { getLocaleFromContext } from 'lib/app-config';
import { urlToSpec } from 'lib/search';

export async function getStaticProps(context) {
  const locale = getLocaleFromContext(context);

  const data = await getData({
    language: locale.crystallizeCatalogueLanguage,
    searchSpec: urlToSpec({ query: context.query })
  });

  return {
    props: data
  };
}

export default Cmp;
