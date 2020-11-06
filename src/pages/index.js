import Cmp, { getData } from 'page-components/frontpage';
import { getLocaleFromContext } from 'lib/app-config';

export async function getStaticProps(context) {
  const { preview } = context;
  const locale = getLocaleFromContext(context);

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
