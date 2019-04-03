const routes = require('express').Router();
const jwt = require('jsonwebtoken');
const emailFormatter = require('./lib/email-formatter');

const users = [];

const secret = process.env.SECRET;

routes.post('/magic-link/:email', async (req, res) => {
  const { email } = req.params;

  const token = jwt.sign({ email }, secret, { expiresIn: '36000s' });
  const hostUrl = `${req.protocol}://${req.get('host')}`;
  const magicLink = `${hostUrl}/api/verify/${token}`;

  const exists = users.some(u => u.token === token);
  if (exists === false) users.push({ email, token });

  const formattedEmail = emailFormatter.getHtml(magicLink);
  // Ready to send email

  /* eslint-disable */
  console.log(formattedEmail);
  /* eslint-enable */

  if (email) {
    res.status(200).send({
      message: 'Email sent! The verification link is only valid for 1 hour'
    });
  } else {
    res.status(400).send({ message: 'No email provided' });
  }
});

routes.get('/verify/:token', (req, res) => {
  const { token } = req.params;
  const exists = users.find(u => u.token === token);
  if (exists && exists.token) {
    jwt.verify(exists.token, secret, (err, decoded) => {
      if (err) {
        res.status(400).send({ message: 'User cannot be verified' });
      } else {
        const { email } = decoded;
        const signedLoginToken = jwt.sign({ email }, secret, {
          expiresIn: '3600s'
        });
        res
          .cookie('token', signedLoginToken, { path: '/', httpOnly: true })
          .writeHead(301, {
            Location: `${req.protocol}://${req.get('host')}/login`
          });
        res.end();
      }
    });
  } else {
    res.status(400).send({ message: 'User cannot be verified' });
  }
});

routes.post('/user/logout', (req, res) => {
  res
    .clearCookie('token')
    .status(200)
    .send({ message: 'OK' });
});

module.exports = routes;
