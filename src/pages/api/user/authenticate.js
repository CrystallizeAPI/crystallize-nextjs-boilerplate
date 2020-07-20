import jwt from 'jsonwebtoken';

export default (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ loggedIn: false });
  }

  // Here you would confirm the token provided by the cookie is a valid token
  // for a user. The boilerplate has no datastore or service to persist users,
  // so we will assume that the token is valid.
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  console.log('JWT contents', decoded);

  return res.json({ loggedIn: true });
};
