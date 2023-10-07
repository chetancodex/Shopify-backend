const express = require('express');
const OrderController = require('../controller/ordercontroller');
const checkAuth = require('../middleware/auth')
const router = express.Router();


router.get('/api/checkout', checkAuth, OrderController.addOrders);
router.get('/', checkAuth , OrderController.getOrders);

module.exports = router