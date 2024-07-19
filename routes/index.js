const express = require('express');
const router = express.Router();
const auth = require('./auth.js');
const cart = require('./cart.js');
const products = require('./products.js');
const profile = require('./products.js');

router.use('/auth', auth);
router.use('/cart', cart);
router.use('/', products);
router.use('/profile', profile);

module.exports = router;
