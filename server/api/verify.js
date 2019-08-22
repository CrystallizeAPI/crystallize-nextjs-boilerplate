const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const { token } = req.params;

  // Here we would want to fetch an entry matching the provided token from our
  // datastore. This boilerplate does not have a datastore connected to it yet
  // so we will just assume the token is for a real user and sign a login token
  // accordingly.

  try {
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);
    const { email } = decoded;
    const signedLoginToken = jwt.sign({ email }, secret, { expiresIn: '12h' });

    res.cookie('token', signedLoginToken, {
      path: '/',
      httpOnly: true,
      maxAge: 3600000
    });
    return res.redirect('/');
  } catch (err) {
    return res.status(400).json({ message: 'User cannot be verified' });
  }
};
