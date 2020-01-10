const router = require('express').Router();
const magicLink = require('./magic-link');
const authenticate = require('./authenticate');
const verify = require('./verify');
const orderPersistence = require('./order-persistence');
const orderConfirmation = require('./order-confirmation');
const createPaymentIntent = require('./stripe/create-payment-intent');

// @extraStripe
// Provides stripe with the Raw body it needs to handle webhook event signatures
//   router.use(bodyParser.json({
//   verify(req, res, buf) {
//     const url = req.originalUrl;
//     if (url.includes('/stripe/webhooks')) {
//       req.rawBody = buf.toString();
//     }
//   }
// })
// )

router.get('/magic-link/:email', magicLink);
router.get('/authenticate', authenticate);
router.get('/verify/:token', verify);
router.post('/order-persistence', orderPersistence);
router.post('/order-confirmation', orderConfirmation);
router.post('/stripe/create-payment-intent', createPaymentIntent);

module.exports = router;
