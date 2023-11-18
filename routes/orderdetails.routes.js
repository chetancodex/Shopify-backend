const express = require('express');
const checkAuth = require('../middleware/auth')
const router = express.Router();
const OrderdetailsController = require('../controller/orderdetailcontroller');

router.get('/',checkAuth,OrderdetailsController.getOrderDetails );
router.post('/', checkAuth, OrderdetailsController.setOrderDetails);

module.exports = router