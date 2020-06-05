import Cmp, { getData } from 'page-components/index';
import { getLanguage } from 'lib/language';

export async function getStaticProps() {
  const data = await getData({ asPath: '/' });

  return {
    props: {
      ...data,
    },
    unstable_revalidate: 1,
  };
}

export async function getStaticPaths() {
  const language = getLanguage();

  return {
    paths: [`/${language}`],
    fallback: true,
  };
}

export default Cmp;
