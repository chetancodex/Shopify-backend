const express = require('express');
const CartController = require('../controller/cartcontroller');
const router = express.Router();

// Post Cart 
router.post('/create',CartController.addProductToCart);
// get cart by username 
router.post('/getcart',CartController.getCartByUsername);


module.exports = router