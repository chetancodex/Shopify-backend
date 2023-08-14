const express = require('express');
const CartController = require('../controller/cartcontroller');
const router = express.Router();

// Post Cart 
router.post('/create',CartController.addProductToCart);



module.exports = router