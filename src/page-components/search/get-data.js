import { simplyFetchFromGraph, simplyFetchFromSearchGraph } from 'lib/graph';
import { SEARCH_QUERY } from 'lib/search';
import query from './query';
import { cleanFilterForTotalAggregations } from './utils';

export async function getData({ asPath, preview, language, searchSpec }) {
  const [searchQueryResponse, catalogueQueryResponse] = await Promise.all([
    simplyFetchFromSearchGraph({
      query: SEARCH_QUERY,
      variables: {
        ...searchSpec,
        aggregationsFilter: cleanFilterForTotalAggregations(searchSpec.filter)
      }
    }),
    asPath
      ? simplyFetchFromGraph({
          query,
          variables: {
            path: asPath,
            language,
            version: preview ? 'draft' : 'published'
          }
        })
      : {}
  ]);

  if (!searchQueryResponse.data) {
    return {
      search: null,
      catalogue: null,
      language
    };
  }

  const {
    search,
    aggregations: { aggregations } = {}
  } = searchQueryResponse.data;

  return {
    search: {
      search,
      aggregations
    },
    catalogue: catalogueQueryResponse.data || null,
    language
  };
}
