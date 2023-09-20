const express = require('express');
const CartController = require('../controller/cartcontroller');
const checkAuth = require('../middleware/auth')
const router = express.Router();

// Post Cart 
router.post('/create',checkAuth,CartController.addProductToCart);
// get cart by username 
router.get('/getcart',checkAuth ,CartController.getCartByUsername);
// delete product
router.post('/delete',checkAuth, CartController.deleteProductFromCart);
router.patch('/create' ,checkAuth, CartController.updateCartItem);

module.exports = router