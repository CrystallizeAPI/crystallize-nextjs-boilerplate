import React, { useEffect, useRef, useState, useReducer } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Layout from 'components/layout';
import { simplyFetchFromGraph, simplyFetchFromSearchGraph } from 'lib/graph';
import { urlToSpec, specToQuery, SEARCH_QUERY } from 'lib/search';
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

export async function getData({ asPath, preview, language, searchSpec }) {
  const [
    {
      data: { search, searchAggregations }
    },
    { data: { searchPage } = {} }
  ] = await Promise.all([
    simplyFetchFromSearchGraph({
      query: SEARCH_QUERY,
      variables: searchSpec
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
    searchData: search,
    searchAggregations: searchAggregations.aggregations,
    catalogueData: searchPage || null,
    language,
    searchSpec
  };
}

export default function SearchPage({
  searchData,
  searchAggregations,
  searchSpec,
  catalogueData
}) {
  const router = useRouter();
  const firstLoad = useRef();
  const [data, setData] = useState(searchData);
  const [spec, dispatch] = useReducer(reducer, searchSpec);

  // Initial data changed
  useEffect(() => {
    setData(searchData);
  }, [searchData]);

  // Search specifications changed from url
  useEffect(() => {
    async function load() {
      const { data } = await simplyFetchFromSearchGraph({
        query: SEARCH_QUERY,
        variables: urlToSpec(router)
      });
      setData(data.search);
    }

    if (!router.isFallback) {
      if (!firstLoad.current) {
        firstLoad.current = true;
        return;
      }

      load();
    }
  }, [router]);

  // Search specifications changed from internal spec
  useEffect(() => {
    if (spec.blockingUIElement) {
      return;
    }

    const asPath = router.asPath.split('?')[0];
    const query = specToQuery(spec);
    const existingQuery = specToQuery(
      urlToSpec({ query: router.query, asPath })
    );

    if (JSON.stringify(query) === JSON.stringify(existingQuery)) {
      // No change to query
      return;
    }

    router.replace(
      {
        as: asPath,
        pathname: asPath,
        query
      },
      undefined,
      { shallow: true }
    );
  }, [spec, router]);

  function navigate({ direction }) {
    if (direction === 'nextPage') {
      dispatch({ action: 'navigate', after: data.pageInfo.endCursor });
    } else {
      dispatch({ action: 'navigate', before: data.pageInfo.startCursor });
    }
  }

  // We're waiting for the search result to come in
  if (router.isFallback) {
    return (
      <Layout>
        <Outer>
          <div style={{ background: '#eee', height: 100, padding: 50 }}>
            Skeleton...?
          </div>
        </Outer>
      </Layout>
    );
  }

  const productEdges = data.edges.filter((e) => e.node.type === 'product');

  return (
    <Layout>
      <Outer>
        <Header>
          <H1>{catalogueData?.name ? catalogueData.name : 'Search'}</H1>
        </Header>
        <ListOuter>
          <Spec
            {...data}
            aggregations={searchAggregations}
            spec={spec}
            dispatch={dispatch}
          />
          <Facets
            aggregations={searchAggregations}
            spec={spec}
            dispatch={dispatch}
          />
          <Results
            {...data}
            spec={spec}
            edges={productEdges}
            navigate={navigate}
          />
        </ListOuter>
      </Outer>
    </Layout>
  );
}
