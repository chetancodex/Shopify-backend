const express = require('express');
const UserUpdateController = require('../controller/userupdatecontroller');
const checkAuth = require('../middleware/auth')
const router = express.Router();

// user update 
router.post('/userDetails',checkAuth, UserUpdateController.postUserUpdate);
    
module.exports = router