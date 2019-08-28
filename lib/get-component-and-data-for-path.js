const { createRequest } = require('urql');
const { pipe, subscribe } = require('wonka');

const initUrqlClient = require('../lib/init-urql-client');
const { TREE_NODE_AND_MENU } = require('../lib/graph');

const nextFiles = /^\/_next\//;
const endsWithFileExtension = /\.[a-z]+$/;

function isFrameworkFiles({ pathname }) {
  // Skip checking for framework assets
  return !!pathname.match(nextFiles) || !!pathname.match(endsWithFileExtension);
}

/**
 * Check if a given request matches one of your entry pages
 * Remember that Next automatically routes the name of your pages
 * to a route. For example: the file pages/user/index.js will automatically
 * map to the url /user
 * @param {Object} url - The URL object
 * @param {Object} url.pathname - The relative path name
 * @param {Object} url.query - The request query
 * @returns {Promise} A promise that resolves to the component name or false if not found
 */
function getComponentForPath({ pathname }) {
  if (isFrameworkFiles({ pathname })) {
    return Promise.resolve({ component: null });
  }

  // Home
  if (pathname === '/') {
    return Promise.resolve({ component: '/' });
  }

  return new Promise(resolve => {
    const [client, cache] = initUrqlClient();

    const request = createRequest(TREE_NODE_AND_MENU, {
      language: 'en',
      path: pathname
    });

    const executeResult = client.executeQuery(request);

    try {
      pipe(
        executeResult,
        subscribe(({ data, error }) => {
          if (error) {
            return resolve({ component: null });
          }

          const [firstNode] = data.tree || [];
          if (!firstNode) {
            return resolve({ component: null });
          }

          // Extract the cache for use later in app
          const urqlState = cache.extractData();

          return resolve({
            component: '/catalog',
            urqlState
          });
        })
      );
      // eslint-disable-next-line no-empty
    } catch (err) {}
  });
}

module.exports = getComponentForPath;
