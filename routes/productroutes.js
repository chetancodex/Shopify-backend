const express = require('express');
const ProductController = require('../controller/productcontroller');

const router = express.Router();
// Get All Products
router.get('/',ProductController.getAllProduct);
// Post a Product
router.post('/', ProductController.postProduct);
// Get Product by Id
router.get('/:id', ProductController.FindOneProductById);
// Update Product
router.put('/:id', ProductController.updateProduct);
//Delete Product
router.delete('/:id', ProductController.deleteOneProduct);

module.exports = router;
