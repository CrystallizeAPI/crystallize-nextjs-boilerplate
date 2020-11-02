import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import produce from 'immer';

import Layout from 'components/layout';
import { simplyFetchFromGraph, simplyFetchFromSearchGraph } from 'lib/graph';
import { urlToSpec, SEARCH_QUERY } from 'lib/search';
import { useLocale } from 'lib/app-config';
import { Outer, Header as H, H1 as h1 } from 'ui';
// import ShapeComponents from 'components/shape/components';

import query from './query';
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
  const { query, asPath, isFallback, replace, ...router } = useRouter();
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

  // Change the url query paramns
  function changeQuery(fn) {
    const { catalogue, ...existingQuery } = query;
    const newQuery = produce(existingQuery, fn);

    replace(
      {
        pathname: asPath.split('?')[0],
        query: newQuery
      },
      undefined,
      { shallow: true }
    );
  }

  function navigate({ direction }) {
    if (direction === 'nextPage') {
      changeQuery((query) => {
        delete query.before;
        query.after = data.search.pageInfo.endCursor;
      });
    } else {
      changeQuery((query) => {
        delete query.after;
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
          />
          <Results {...data.search} spec={spec} navigate={navigate} />
        </ListOuter>
      </Outer>
    </Layout>
  );
}
