/**
 * Check if a given request matches one of your entry pages
 * Remember that Next automatically routes the name of your pages
 * to a route. For example: the file pages/user/index.js will automatically
 * map to the url /user
 * @param {Object} url - The URL object
 * @param {Object} url.pathname - The relative path name
 * @param {Object} url.query - The request query
 * @returns {(string|boolean)} The component name or false if not found
 */
async function PageMatchForRequest({ pathname }) {
  // Skip checking for framework assets
  if (pathname.match(/^\/_next\//)) {
    return Promise.resolve(false);
  }

  if (pathname === '/me') {
    return Promise.resolve('/user');
  }

  // Handle all the root level categories
  if (pathname === '/standard') {
    return Promise.resolve('/category');
  }

  return Promise.resolve(false);
}

module.exports = {
  PageMatchForRequest
};
