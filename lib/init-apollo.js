/* eslint no-underscore-dangle: 0 */
const { ApolloClient, HttpLink } = require('apollo-boost');
const fetch = require('cross-fetch');
const {
  InMemoryCache,
  IntrospectionFragmentMatcher
} = require('apollo-cache-inmemory');

const introspectionQueryResultData = require('./fragment-types.json');

let apolloClient = null;

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const create = initialState =>
  new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: global.__crystallizeConfig.GRAPH_URL, // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`,
      fetch: !process.browser && fetch
    }),
    cache: new InMemoryCache({ fragmentMatcher }).restore(initialState || {})
  });

module.exports = function initApollo(initialState) {
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
};
