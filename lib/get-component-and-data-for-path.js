const initApollo = require('../lib/init-apollo');
const { FETCH_TREE_NODE_AND_MENU } = require('../lib/graph');

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
async function getComponentForPath({ pathname }) {
  if (isFrameworkFiles({ pathname })) {
    return { component: null };
  }

  // Home
  if (pathname === '/') {
    return { component: '/' };
  }

  // Get type of page from Crystallize
  try {
    const client = initApollo();

    // eslint-disable-next-line no-underscore-dangle
    const response = await client.query({
      query: FETCH_TREE_NODE_AND_MENU,
      variables: {
        language: 'en',
        path: pathname
      }
    });

    const [firstNode] = response.data.tree || [];
    if (!firstNode) {
      return { component: null };
    }

    return {
      component: '/catalog',
      apolloState: client.cache.extract()
    };
  } catch (e) {
    return { component: null };
  }
}

module.exports = getComponentForPath;
