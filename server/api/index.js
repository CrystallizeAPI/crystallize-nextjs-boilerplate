const router = require('express').Router();
const magicLink = require('./magic-link');
const authenticate = require('./authenticate');
const verify = require('./verify');

router.get('/magic-link/:email', magicLink);
router.get('/authenticate', authenticate);
router.get('/verify/:token', verify);

module.exports = router;
