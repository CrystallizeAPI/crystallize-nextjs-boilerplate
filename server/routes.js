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
function PageMatchForRequest({ pathname, query }) {
  return new Promise(resolve => {
    if (query && query.something) {
      return resolve('/');
    } else if (pathname === '/profile') {
      return resolve('/user');
    } else if (pathname === '/frontpage') {
      return resolve('/');
    }

    // No matching page found for the the request
    return resolve(false);
  });
}

module.exports = {
  PageMatchForRequest
};
