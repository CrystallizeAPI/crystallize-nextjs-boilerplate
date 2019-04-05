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
async function PageMatchForRequest({ pathname }) {
  // Skip checking for framework assets
  if (pathname.match(/^\/_next\//)) {
    return Promise.resolve(false);
  }

  // Skip checking for all paths that end with a file extension
  if (pathname.match(/\.[a-z]+$/)) {
    return Promise.resolve(false);
  }

  if (pathname.match(/^\/checkout\/confirmation/)) {
    return Promise.resolve('/checkout/confirmation');
  }

  if (pathname.match(/^\/user/)) {
    return Promise.resolve('/user');
  }

  if (pathname.match(/^\/login/)) {
    return Promise.resolve('/login');
  }

  if (pathname === '/') {
    return Promise.resolve('/index');
  }

  const paths = pathname.match(/\/([-a-zA-Z0-9@:%_+.~]+)/gi);
  if (paths) {
    switch (paths.length) {
      case 1: {
        return Promise.resolve('/category');
      }
      case 2: {
        return Promise.resolve('/product');
      }
      case 3: {
        return Promise.resolve('/login');
      }
      case 4: {
        return Promise.resolve('/index');
      }
      default:
        return Promise.resolve(false);
    }
  }

  return Promise.resolve(false);
}

module.exports = {
  PageMatchForRequest
};
