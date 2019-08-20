export default async (req, res) => {
  const { token } = req.cookies;

  // Here you would confirm the token provided by the cookie is a valid token
  // for a user. The boilerplate has no datastore or service to persist users,
  // so we will assume that the token is valid.

  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  return res.json({ message: 'User authenticated' });
};
