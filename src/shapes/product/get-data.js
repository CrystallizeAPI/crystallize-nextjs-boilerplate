import { simplyFetchFromGraph } from 'lib/graph';
import { QUERY_PRODUCT } from './query';

export async function getData({ asPath, language, preview = null }) {
  const { data } = await simplyFetchFromGraph({
    query: QUERY_PRODUCT,
    variables: {
      path: asPath,
      language,
      version: preview ? 'draft' : 'published'
    }
  });
  return { ...data, preview };
}
