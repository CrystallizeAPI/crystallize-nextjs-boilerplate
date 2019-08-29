const { TREE_NODE, MENU_AND_TENANT } = require('./graph');
const executeQueries = require('./graph/execute-queries');

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
async function getComponentForPath({ pathname, language = 'en' }) {
  if (isFrameworkFiles({ pathname })) {
    return { component: null };
  }

  // Home
  if (pathname === '/') {
    return { component: '/' };
  }

  try {
    /**
     * Get both the current component at the path and
     * also the top menu and tenant settings. We do both
     * here since the menu and tenant query most likely
     * will be executed later anyways. This approach will
     * save a good handful of milliseconds
     */
    const { data, urqlState } = await executeQueries([
      {
        query: TREE_NODE,
        variables: {
          language,
          path: pathname
        }
      },
      {
        query: MENU_AND_TENANT,
        variables: {
          language
        }
      }
    ]);

    const [treeNode] = data;

    const [firstNode] = treeNode.tree || [];
    if (!firstNode) {
      return { component: null };
    }

    return {
      component: '/catalog',
      urqlState
    };
  } catch (error) {
    return {
      component: null
    };
  }
}

module.exports = getComponentForPath;
