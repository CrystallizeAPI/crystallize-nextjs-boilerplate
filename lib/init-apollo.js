/* eslint no-underscore-dangle: 0 */
import { ApolloClient, HttpLink } from 'apollo-boost';
import fetch from 'cross-fetch';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';

import introspectionQueryResultData from './fragmentTypes.json';

const uri = `${global.__crystallizeConfig.API_URL}`;
let apolloClient = null;

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create() {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    uri: global.__crystallizeConfig.API_URL,
    cache: new InMemoryCache({ fragmentMatcher }),
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri, // Server URL (must be absolute)
      credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
    })
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
