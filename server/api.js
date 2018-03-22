const { Router } = require('express');

const router = new Router();

const basketApi = require('@crystallize/express-basket');

router.use('/basket', basketApi);

module.exports = router;
