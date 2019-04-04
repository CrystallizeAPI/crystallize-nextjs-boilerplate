require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const next = require('next');
const { parse } = require('url');
const { join } = require('path');

const jwt = require('jsonwebtoken');
const { PageMatchForRequest } = require('../lib/routes');
const config = require('./config');
const checkout = require('./checkout');

const app = next({ dev: config.DEV });
const handle = app.getRequestHandler();

const api = require('./api');

const authMiddleware = headers => {
  /* eslint-disable */
  const token =
    (headers &&
      headers.cookie &&
      (headers.cookie.match('(^|;) *' + 'token' + '=([^;]*)') || '')[2]) ||
    false;
  if (!token) {
    return false;
  }
  return jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return false;
    }
    if (decoded) {
      return true;
    }
  });
  /* eslint-enable */
};

app.prepare().then(() => {
  const server = express();

  server.use(helmet());

  server.use(checkout(app));

  server.use('/api', api);

  // Helper function for throwing 404's from Next pages
  server.get('*', async (req, res, doNext) => {
    req.throw404 = function throw404() {
      const err = new Error();
      err.code = 'ENOENT';
      throw err;
    };
    doNext();
  });

  server.get('*', async (req, res) => {
    const parsedUrl = parse(req.url, true);
    const pageMatch = await PageMatchForRequest(parsedUrl);
    if (pageMatch) {
      const response = authMiddleware(req.headers);
      if (response === true) {
        req.headers.isLoggedIn = true;
      }
      app.render(req, res, pageMatch, parsedUrl.query);
    } else if (parsedUrl.pathname === '/service-worker.js') {
      if (config.DEV) {
        res.status(404);
      } else {
        const filePath = join(__dirname, '..', '.next', parsedUrl.pathname);
        app.serveStatic(req, res, filePath);
      }
    } else {
      handle(req, res, parsedUrl);
    }
  });

  server.listen(config.PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${config.PORT}`); // eslint-disable-line
  });
});
