const express = require('express');
const router = express.Router();
const CheckAuth = require('../utils/CheckAuth');
const CartServices = require('../services/Cart.service');

router.get('/', CheckAuth, CartServices.getAllItems);
router.post('/addItem', CheckAuth, CartServices.addItem);
router.delete('/removeItem/:productId', CheckAuth, CartServices.deleteItem);
router.post('/minusItem', CheckAuth, CartServices.minusItem);

module.exports = router;