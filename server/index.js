const { createServer } = require('http');
const next = require('next');
const { parse } = require('url');

const { PageMatchForRequest } = require('./routes');
const config = require('../config');

const port = parseInt(config.PORT, 10);
const dev = config.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true);
    const pageMatch = await PageMatchForRequest(parsedUrl);
    if (pageMatch) {
      app.render(req, res, pageMatch, parsedUrl.query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
  });
});
