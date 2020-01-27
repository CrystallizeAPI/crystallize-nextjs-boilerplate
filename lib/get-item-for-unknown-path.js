const simplyFetchFromGraph = require('./graph/simply-fetch-from-graph.js');

function isFrameworkFiles({ pathname }) {
  const nextFiles = /^\/_next\//;
  const jsonFilesForDev = /^\/json(\/version)?$/;
  const endsWithFileExtension = /\.[a-z]+$/;

  return (
    !!pathname.match(nextFiles) ||
    !!pathname.match(jsonFilesForDev) ||
    !!pathname.match(endsWithFileExtension)
  );
}

/**
 * Check if a given pathname matches something in Crystallize
 * Remember that Next automatically routes the name of your pages
 * to a route. For example: the file `pages/user/index.js` will automatically
 * map to the url `/user`
 */
async function getItemForUknownPath({ pathname, language }) {
  // Skip checking for framework assets
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
     * will be fetched later anyways. This approach will
     * save a good handful of milliseconds
     */
    const { data } = await simplyFetchFromGraph({
      query: `
        query GET_ITEM_FOR_UNKNOWN_URL($language: String!, $path: String) {
          tree(language: $language, path: $path) {
            type
          }
        }
      `,
      variables: {
        language,
        path: pathname
      }
    });

    const [firstNode] = data.tree || [];
    if (!firstNode) {
      return { component: null };
    }

    /**
     * We have a response with a type, great! Let's continue
     * by rendering the corresponding item
     */
    const typeToTemplate = {
      document: '/_crystallize-document',
      folder: '/_crystallize-folder',
      product: '/_crystallize-product'
    };

    return {
      component: typeToTemplate[firstNode.type.toLowerCase()] || null
    };
  } catch (error) {
    console.log('Error in determining item for unknown path');
    console.log(error);
    return {
      component: null
    };
  }
}

module.exports = getItemForUknownPath;
