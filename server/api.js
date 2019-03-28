const routes = require('express').Router();
const crypto = require('crypto');
const emailFormatter = require('./lib/email-formatter');

const users = [];

const secret = process.env.SECRET;

routes.post('/login-user/:email', async (req, res) => {
  const { email } = req.params;

  const hash = crypto
    .createHmac('sha1', secret)
    .update(email)
    .digest('hex');
  const hostUrl = `${req.protocol}://${req.get('host')}`;
  const magicLink = `${hostUrl}/api/verify/${hash}`;

  const exists = users.some(u => u.hash === hash);
  if (exists === false) users.push({ email, hash });

  const formattedEmail = emailFormatter.getHtml(magicLink);
  // Ready to send email
  console.log(formattedEmail);

  console.log(users);

  if (email) {
    console.log(magicLink);
    res.status(200).send({ message: 'Email sent!' });
  } else {
    res.status(400).send({ message: 'No email provided' });
  }
});

routes.get('/verify/:token', (req, res) => {
  const { token } = req.params;
  const exists = users.some(u => u.hash === token);
  if (exists) {
    res.status(200).send({ token });
  } else {
    res.status(400).send({ message: 'User cannot be verified' });
  }
});

module.exports = routes;
