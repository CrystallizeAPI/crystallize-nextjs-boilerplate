import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export default (req, res) => {
  const { token } = req.query;

  // Here we would want to fetch an entry matching the provided token from our
  // datastore. This boilerplate does not have a datastore connected to it yet
  // so we will just assume the token is for a real user and sign a login token
  // accordingly.

  try {
    const decoded = jwt.verify(token, secret);
    const { email } = decoded;
    const signedLoginToken = jwt.sign({ email }, secret, { expiresIn: '12h' });

    res.setHeader(
      'Set-Cookie',
      `token=${signedLoginToken}; HttpOnly; Max-Age=3600; Path=/`
    );
    res.setHeader('Location', '/');
    return res.status(302).json({ message: 'User is verified' });
  } catch (err) {
    return res.status(400).json({ message: 'User cannot be verified' });
  }
};
