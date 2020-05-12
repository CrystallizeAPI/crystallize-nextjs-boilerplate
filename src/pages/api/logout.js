export default (req, res) => {
  res.setHeader(
    'Set-Cookie',
    'token=deleted; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
  );
  return res.status(200).json({ message: 'Logged out successfully' });
};
