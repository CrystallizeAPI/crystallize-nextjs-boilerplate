require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const next = require('next');
const { parse } = require('url');
const { join } = require('path');

const getComponentAndDataForPath = require('../lib/get-component-and-data-for-path');
const config = require('../config');

const app = next({ dev: config.DEV });
const handle = app.getRequestHandler();

const api = require('./api');

app.prepare().then(() => {
  const server = express();
  server.use(helmet());
  server.use(cookieParser());
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

    if (parsedUrl.pathname === '/service-worker.js') {
      if (config.DEV) {
        res.status(404);
      } else {
        const filePath = join(__dirname, '..', '.next', parsedUrl.pathname);
        app.serveStatic(req, res, filePath);
      }
    } else {
      const { component, apolloState } = await getComponentAndDataForPath(
        parsedUrl
      );
      if (component) {
        // Attach the apollo state to be used in lib/with-data
        req.initialApolloState = apolloState;
        app.render(req, res, component, parsedUrl.query);
      } else {
        // Let Next.js handle the path
        handle(req, res);
      }
    }
  });

  server.listen(config.PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${config.PORT}`); // eslint-disable-line
  });
});
