const { Router } = require('express');
const basketApi = require('@crystallize/express-basket');

const router = new Router();

router.use('/basket', basketApi);

module.exports = router;
