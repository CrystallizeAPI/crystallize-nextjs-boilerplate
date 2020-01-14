const { STRIPE_PUBLISHABLE_KEY } = require('../../../config');

export default (req, res) => {
  res.json({ publishableKey: STRIPE_PUBLISHABLE_KEY });
};
