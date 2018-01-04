/**
 * Check if a given request matches one of your entry pages
 * @param {Object} url - The URL object
 * @param {Object} url.pathname - The relative path name
 * @param {Object} url.query - The request query
 * @returns {(string|boolean)} The component name or false if not found
 */
function PageMatchForRequest({ pathname, query }) {
  if (query && query.something) {
    return '/';
  } else if (pathname === '/pagetwo') {
    return '/page2';
  } else if (pathname === '/frontpage') {
    return '/';
  }

  // No matching page found for the the request
  return false;
}

module.exports = {
  PageMatchForRequest
};
