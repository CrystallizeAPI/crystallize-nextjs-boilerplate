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
  } else if (pathname === '/profile') {
    return Promise.resolve('/user');
  } else if (pathname === '/frontpage') {
    return Promise.resolve('/');
  }

  return new Promise(async resolve => {
    try {
      resolve(await getPagePathFromRequest({ pathname, query }));
    } catch (e) {
      console.error(e); // eslint-disable-line
      resolve(false);
    }
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
