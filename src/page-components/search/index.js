import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import produce from 'immer';
import styled from 'styled-components';
import { Inner } from 'ui';

import Layout from 'components/layout';
import { getData } from './get-data';
import { cleanFilterForTotalAggregations } from './utils';
import { simplyFetchFromSearchGraph } from 'lib/graph';
import { urlToSpec, SEARCH_QUERY } from 'lib/search';
import { useLocale } from 'lib/app-config';
import toText from '@crystallize/content-transformer/toText';
import PageHeader from 'components/page-header';

import Stackable from 'components/stackable';

import { ListOuter, SearchActions, LocateRight } from './styles';
import OrderBy from './order-by';
import Results from './results';
import Facets from './facets';
import SearchCount from './count';

const Outer = styled(Inner)``;

export { getData };

async function loadPage(spec) {
  const { data } = await simplyFetchFromSearchGraph({
    query: SEARCH_QUERY,
    variables: {
      ...spec,
      aggregationsFilter: cleanFilterForTotalAggregations(spec.filter)
    }
  });

  const { search, aggregations: { aggregations } = {} } = data || {};

  return {
    search,
    aggregations
  };
}

export default function SearchPage(props) {
  const { search, catalogue } = props;
  const firstLoad = useRef();
  const { query, asPath, ...router } = useRouter();
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
    if (!firstLoad.current) {
      firstLoad.current = true;

      if (query.catalogue) {
        return;
      }
    }

    loadPageCb(query);
  }, [query, loadPageCb]);

  // Change the url query params
  function changeQuery(fn) {
    const newQuery = produce(query, (draft) => {
      delete draft.before;
      delete draft.after;
      fn(draft);
    });

    /*
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
      return changeQuery((query) => {
        query.after = data.search.pageInfo.endCursor;
      });
    } else {
      changeQuery((query) => {
        query.before = data.search.pageInfo.startCursor;
      });
    }
  }

  function handleOrderByChange(orderBy, index) {
    changeQuery((query) => {
      if (index > 0) {
        query.orderby = orderBy.value;
      } else {
        delete query.orderby;
      }
    });
  }

  // We're waiting for the search result to come in
  const isWaitingForSearchResult = !data || !data.search;
  if (isWaitingForSearchResult) {
    return (
      <Layout title="Searching...">
        <Outer>
          <ListOuter>
            <OrderBy orderBy={spec.orderBy} onChange={handleOrderByChange} />
            <Facets spec={spec} changeQuery={changeQuery} />
          </ListOuter>
        </Outer>
      </Layout>
    );
  }
  const title = catalogue?.searchPage?.name
    ? catalogue.searchPage.name
    : 'Search';

  const description = catalogue?.searchPage?.components?.find(
    (c) => c.name === 'Brief'
  )?.content?.json;

  const stacks = catalogue?.searchPage?.components?.find(
    (c) => c.name === 'Stackable content'
  )?.content?.items;

  const totalResults = data.search.aggregations.totalResults;

  return (
    <Layout title={title} description={toText(description)}>
      <Outer>
        <PageHeader {...{ title, description }} />
        <Stackable stacks={stacks} />
        <ListOuter>
          <SearchActions>
            <Facets
              aggregations={data.aggregations}
              spec={spec}
              changeQuery={changeQuery}
              totalResults={totalResults}
            />
            <LocateRight>
              <OrderBy orderBy={spec.orderBy} onChange={handleOrderByChange} />
            </LocateRight>
          </SearchActions>
          <SearchCount count={totalResults} />
          <Results {...data.search} spec={spec} navigate={navigate} />
        </ListOuter>
      </Outer>
    </Layout>
  );
}
