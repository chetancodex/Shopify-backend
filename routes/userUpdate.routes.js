const express = require('express');
const UserUpdateController = require('../controller/userupdatecontroller');
const checkAuth = require('../middleware/auth')
const router = express.Router();

// user update 
router.post('/api',checkAuth, UserUpdateController.postUserUpdate);
router.get('/api',checkAuth,UserUpdateController.getUserDetails);
module.exports = router