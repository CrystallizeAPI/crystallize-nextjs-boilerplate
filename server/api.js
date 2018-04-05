const { Router } = require('express');
const basketApi = require('@crystallize/react-basket/server');

const router = new Router();

router.use('/basket', basketApi);

module.exports = router;
