/* eslint no-underscore-dangle: 0 */
const {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange
} = require('urql');

if (typeof window === 'undefined') {
  // eslint-disable-next-line global-require
  require('isomorphic-unfetch');
}

let urqlClient = null;
let ssrCache = null;

module.exports = function initUrqlClient(initialState, { url }) {
  // Create a new client for every server-side rendered request to reset its state
  // for each rendered page
  // Reuse the client on the client-side however
  const isServer = typeof window === 'undefined';
  if (isServer || !urqlClient) {
    ssrCache = ssrExchange({ initialState });

    urqlClient = createClient({
      url,
      // Active suspense mode on the server-side
      suspense: isServer,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange]
    });
  }

  // Return both the cache and the client
  return [urqlClient, ssrCache];
};
