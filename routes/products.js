const express = require('express');
const router = express.Router();
const CheckAuth = require('../utils/CheckAuth');
const ProductServices = require('../services/Products.service');

router.get('/products', CheckAuth, ProductServices.getAllProducts);
router.get('/products/:id', CheckAuth, ProductServices.getOneProduct);
router.post('/products/addProduct', CheckAuth, ProductServices.addProduct);
router.delete('/products/:id', CheckAuth, ProductServices.deleteProduct);

module.exports = router;