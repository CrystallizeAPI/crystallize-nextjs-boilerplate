import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import produce from 'immer';

import Layout from 'components/layout';
import { simplyFetchFromGraph, simplyFetchFromSearchGraph } from 'lib/graph';
import { urlToSpec, SEARCH_QUERY } from 'lib/search';
import { useLocale } from 'lib/app-config';
import { Outer, Header as H, H1 as h1, responsive } from 'ui';
// import ShapeComponents from 'components/shape/components';

import query from './query';
import Spec from './spec';
import Results from './results';
import Facets from './facets';

const Header = styled(H)`
  margin: 0;
  padding: 30px 0;

  ${responsive.mdPlus} {
    padding: 75px 70px 25px;
  }
`;

const H1 = styled(h1)`
  padding: 0;
`;

const ListOuter = styled.div`
  max-width: 1600px;
  margin: 0 auto;

  ${responsive.mdPlus} {
    padding: 0 70px;
    display: grid;
    grid-gap: 40px;
    grid-template-areas:
      'facets spec'
      'facets products';
    grid-template-columns: 1fr 3fr;
  }

  ${responsive.lg} {
    grid-template-columns: 1fr 4fr;
  }
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

async function loadPage(spec) {
  const { data } = await simplyFetchFromSearchGraph({
    query: SEARCH_QUERY,
    variables: {
      ...spec,
      aggregationsFilter: cleanFilterForTotalAggregations(spec.filter)
    }
  });

  const {
    search,
    aggregations: { aggregations }
  } = data;

  return {
    search,
    aggregations
  };
}

export default function SearchPage({ search, catalogue }) {
  const firstLoad = useRef();
  const { query, asPath, isFallback, ...router } = useRouter();
  const locale = useLocale();
  const [data, setData] = useState(search);

  /**
   * Memoize the load page function so that it only changes
   * if the asPath or locale changes
   */
  const loadPageCb = useCallback(
    async (query) => {
      const { catalogue, ...rest } = query;
      const newData = await loadPage(
        urlToSpec({ query: rest, asPath }, locale)
      );
      setData(newData);
    },
    [asPath, locale]
  );

  // The search specifications from the path, locale and query
  const spec = urlToSpec({ query, asPath }, locale);

  // Initial data changed
  useEffect(() => {
    setData(search);
  }, [search]);

  // Query changed
  useEffect(() => {
    if (!isFallback) {
      if (!firstLoad.current) {
        firstLoad.current = true;

        if (query.catalogue) {
          return;
        }
      }

      loadPageCb(query);
    }
  }, [query, isFallback, loadPageCb]);

  // Change the url query params
  function changeQuery(fn) {
    const newQuery = produce(query, (draft) => {
      delete draft.before;
      delete draft.after;
      fn(draft);
    });

    /**
     * We need to extract the [...catalogue] query params
     * in order to get a clean set of query params to work with
     */
    const { catalogue, ...queryWithoutRouteInfo } = newQuery;

    const newQueryAsString = new URLSearchParams(
      queryWithoutRouteInfo
    ).toString();
    let asPathClean = asPath.split('?')[0];
    if (newQueryAsString) {
      asPathClean += `?${newQueryAsString}`;
    }

    router.replace(
      {
        pathname: router.pathname,
        query: newQuery
      },
      asPathClean,
      { shallow: true }
    );
  }

  function navigate({ direction }) {
    if (direction === 'nextPage') {
      changeQuery((query) => {
        query.after = data.search.pageInfo.endCursor;
      });
    } else {
      changeQuery((query) => {
        query.before = data.search.pageInfo.startCursor;
      });
    }
  }

  // We're waiting for the search result to come in
  if (router.isFallback || !data) {
    return (
      <Layout>
        <Outer>
          <ListOuter>
            <Spec spec={spec} changeQuery={changeQuery} />
            <Facets spec={spec} changeQuery={changeQuery} />
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
          <Spec {...data.search} spec={spec} changeQuery={changeQuery} />
          <Facets
            aggregations={data.aggregations}
            spec={spec}
            changeQuery={changeQuery}
            totalResults={data.search.aggregations.totalResults}
          />
          <Results {...data.search} spec={spec} navigate={navigate} />
        </ListOuter>
      </Outer>
    </Layout>
  );
}
