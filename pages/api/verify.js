const jwt = require('jsonwebtoken');
const { users, secret } = require('./helpers');

module.exports = (req, res) => {
  const { token } = req.query;
  const exists = users.find(u => u.token === token);

  if (!exists || !exists.token) {
    res.status(400).send({ message: 'User cannot be verified' });
    return;
  }

  jwt.verify(exists.token, secret, (err, decoded) => {
    if (err) {
      return res.status(400).send({ message: 'User cannot be verified' });
    }

    const { email } = decoded;
    const signedLoginToken = jwt.sign({ email }, secret, {
      expiresIn: '12h'
    });
    res
      .cookie('token', signedLoginToken, {
        path: '/',
        httpOnly: true,
        maxAge: 36000000
      })
      .writeHead(301, {
        Location: `${req.headers['x-forwarded-proto']}://${
          req.headers.host
        }/login`
      });
    return res.end();
  });
};
