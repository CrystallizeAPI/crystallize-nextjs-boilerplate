/**
 * Check if a given request matches one of your entry pages
 * Remember that Next automatically routes the name of your pages
 * to a route. For example: the file pages/user.js will automatically
 * map to the url /user
 * @param {Object} url - The URL object
 * @param {Object} url.pathname - The relative path name
 * @param {Object} url.query - The request query
 * @returns {(string|boolean)} The component name or false if not found
 */
async function PageMatchForRequest({ pathname, query }) {
  // Skip checking for next build files
  if (pathname.match(/^\/_next\//)) {
    return Promise.resolve(false);
  }

  if (query && query.testToForceFrontpage) {
    return Promise.resolve('/');
  } else if (pathname === '/') {
    return Promise.resolve('/');
  } else if (pathname.match(/^\/(profile|user)$/)) {
    return Promise.resolve('/user');
  }

  return new Promise(async function resolvePagePath(resolve) {
    let pagePath = false;
    try {
      const foundPath = await getPagePathFromAPI({ pathname, query });
      if (foundPath) {
        pagePath = foundPath;
      } else {
        const paths = pathname.match(/\/([a-z]+)/g);
        if (!!paths && paths.length === 1) {
          pagePath = '/category';
        }

        // No hits for custom route found. Let Next handle the route
        resolve(false);
      }
    } catch (e) {
      console.error(e); // eslint-disable-line
    }
    return resolve(pagePath);
  });
}

// Todo: Insert dynamic URL lookup here
function getPagePathFromAPI() {
  return Promise.resolve(false);
}

module.exports = {
  PageMatchForRequest
};
