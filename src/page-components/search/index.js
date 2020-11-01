import React, {
  useEffect,
  useRef,
  useState,
  useReducer,
  useCallback
} from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import produce from 'immer';

import Layout from 'components/layout';
import { simplyFetchFromGraph, simplyFetchFromSearchGraph } from 'lib/graph';
import { urlToSpec, specToQuery, SEARCH_QUERY } from 'lib/search';
import { useLocale } from 'lib/app-config';
import { Outer, Header as H, H1 as h1 } from 'ui';
// import ShapeComponents from 'components/shape/components';

import query from './query';
import reducer from './reducer';
import Spec from './spec';
import Results from './results';
import Facets from './facets';

const Header = styled(H)`
  padding: 75px 70px 25px;
  margin: 0;
`;

const H1 = styled(h1)`
  padding: 0;
`;

const ListOuter = styled.div`
  max-width: 1600px;
  margin: 0px auto 0;
  padding: 0 70px;
  display: grid;
  grid-gap: 40px;
  grid-template-columns: 300px 1fr 1fr 1fr;
  grid-template-areas:
    'spec spec spec spec '
    'facets products products products ';
`;

function cleanFilterForTotalAggregations(filter) {
  return produce(filter, (draft) => {
    delete draft.productVariants.priceRange;
    delete draft.productVariants.attributes;
  });
}

export async function getData({ asPath, preview, language, searchSpec }) {
  const [
    {
      data: {
        search,
        aggregations: { aggregations }
      }
    },
    { data: { searchPage } = {} }
  ] = await Promise.all([
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

  return {
    search: {
      search,
      aggregations
    },
    catalogue: searchPage || null,
    language
  };
}

export default function SearchPage({ search, catalogue }) {
  const firstLoad = useRef();
  const { query, asPath, isFallback, replace, ...router } = useRouter();
  const locale = useLocale();

  const getNewSpec = useCallback(() => urlToSpec({ query, asPath }, locale), [
    query,
    asPath,
    locale
  ]);

  const [data, setData] = useState(search);
  const [spec, dispatch] = useReducer(reducer, getNewSpec());

  // Initial data changed
  useEffect(() => {
    setData(search);
  }, [search]);

  // Search specifications changed from url
  useEffect(() => {
    async function load() {
      const newSpec = getNewSpec();
      const { data } = await simplyFetchFromSearchGraph({
        query: SEARCH_QUERY,
        variables: {
          ...newSpec,
          aggregationsFilter: cleanFilterForTotalAggregations(newSpec.filter)
        }
      });

      const {
        search,
        aggregations: { aggregations }
      } = data;

      setData({
        search,
        aggregations
      });
    }

    if (!isFallback) {
      if (!firstLoad.current) {
        firstLoad.current = true;

        // No need to initially load SSG pages
        if (query.catalogue) {
          return;
        }
      }

      load();
    }
  }, [isFallback, query, getNewSpec]);

  // Search specifications changed from internal spec
  useEffect(() => {
    if (spec.blockingUIElement) {
      return;
    }

    const { catalogue, ...existingQuery } = query;

    const newQuery = specToQuery(spec);
    if (JSON.stringify(existingQuery) !== JSON.stringify(newQuery)) {
      replace(
        {
          pathname: asPath.split('?')[0],
          query: newQuery
        },
        undefined,
        { shallow: true }
      );
    }
  }, [spec, query, asPath, replace]);

  function navigate({ direction }) {
    if (direction === 'nextPage') {
      dispatch({ action: 'navigate', after: data.search.pageInfo.endCursor });
    } else {
      dispatch({
        action: 'navigate',
        before: data.search.pageInfo.startCursor
      });
    }
  }

  // We're waiting for the search result to come in
  if (router.isFallback || !data) {
    return (
      <Layout>
        <Outer>
          <ListOuter>
            <Spec spec={spec} dispatch={dispatch} />
            <Facets spec={spec} dispatch={dispatch} />
          </ListOuter>
        </Outer>
      </Layout>
    );
  }

  return (
    <Layout>
      <Outer>
        <Header>
          <H1>{catalogue?.name ? catalogue.name : 'Search'}</H1>
        </Header>
        <ListOuter>
          <Spec {...data.search} spec={spec} dispatch={dispatch} />
          <Facets
            aggregations={data.aggregations}
            spec={spec}
            dispatch={dispatch}
          />
          <Results {...data.search} spec={spec} navigate={navigate} />
        </ListOuter>
      </Outer>
    </Layout>
  );
}
