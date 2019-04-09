/* eslint no-underscore-dangle: 0 */
import { ApolloClient, HttpLink } from 'apollo-boost';
import fetch from 'cross-fetch';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';

import introspectionQueryResultData from './fragmentTypes.json';

const uri = global.__crystallizeConfig.GRAPH_URL;
let apolloClient = null;

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

const create = initialState =>
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  new ApolloClient({
    uri,
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri, // Server URL (must be absolute)
      credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache({ fragmentMatcher }).restore(initialState || {})
  });

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  if (process.browser) {
    apolloClient = create();
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
