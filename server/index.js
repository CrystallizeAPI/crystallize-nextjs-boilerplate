const express = require('express');
const helmet = require('helmet');
const next = require('next');
const { parse } = require('url');

const { PageMatchForRequest } = require('./routes');
const config = require('./config');

const port = parseInt(config.PORT, 10);
const dev = config.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(helmet());

  server.get('*', async (req, res) => {
    const parsedUrl = parse(req.url, true);
    const pageMatch = await PageMatchForRequest(parsedUrl);
    if (pageMatch) {
      app.render(req, res, pageMatch, parsedUrl.query);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
  });
});
