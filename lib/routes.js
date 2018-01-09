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
      const foundPath = await getPagePathFromRequest({ pathname, query });
      if (foundPath) {
        pagePath = foundPath;
      } else {
        const paths = pathname.match(/\/([a-z]+)/g);
        if (!!paths && paths.length === 1) {
          pagePath = '/category';
        }

        // Todo. Figure out how to match other routes like
        // /category/subcat
        // /category/subcat/product

        // No hits. We must just assume this is a category page then
        pagePath = '/category';
      }
    } catch (e) {
      console.error(e); // eslint-disable-line
    }
    return resolve(pagePath);
  });
}

function getPagePathFromRequest() {
  // Todo: Insert dynamic URL lookup here
  // return Promise.resolve('/');

  return Promise.resolve(false);
}

module.exports = {
  PageMatchForRequest
};
