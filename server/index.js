require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const next = require('next');
const { parse } = require('url');

const getComponentAndDataForPath = require('../lib/get-component-and-data-for-path');
const config = require('../config');
const api = require('./api');

const app = next({ dev: config.DEV });
const handle = app.getRequestHandler();

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

    try {
      const { component, urqlState } = await getComponentAndDataForPath(
        parsedUrl
      );

      if (component) {
        // Attach the urql state to be used in lib/with-urql-client
        req.initialUrqlState = urqlState;
        app.render(req, res, component, parsedUrl.query);
      } else {
        // Let Next.js handle the path
        handle(req, res);
      }
    } catch (error) {
      handle(req, res);
    }
  });

  server.listen(config.PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${config.PORT}`); // eslint-disable-line
  });
});
