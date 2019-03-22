const routes = require('express').Router();
const crypto = require('crypto');
const fs = require('fs');
const users = require('./data/users.json');
const emailFormatter = require('./lib/email-formatter');

const secret = 'somesecretscanneverberevealed';

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

  fs.writeFile(
    './server/data/users.json',
    JSON.stringify(users),
    'utf8',
    err => {
      if (err) {
        return console.error(err);
      }
      return {};
    }
  );

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
