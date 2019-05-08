const fetch = require('cross-fetch');

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
    // eslint-disable-next-line no-underscore-dangle
    const r = await fetch(global.__crystallizeConfig.GRAPH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        variables: {
          language: 'en',
          url: pathname
        },
        query: `
          query GET_TYPE_FOR_PATH($language: String!, $url: String) {
            tree(language: $language, path: $url) {
              ... on Item {
                type
              }
            }
          }
        `
      })
    });

    const { data } = await r.json();

    if (!r.ok) {
      return { component: null, error: data };
    }

    const [firstNode] = data.tree || [];
    if (!firstNode) {
      return { component: null };
    }

    return {
      component: `/${firstNode.type}`
    };
  } catch (e) {
    return { component: null };
  }
}

module.exports = getComponentForPath;
