const express = require('express');
const UserUpdateController = require('../controller/userupdatecontroller');
const router = express.Router();

// user update 
router.post('/userDetails', UserUpdateController.postUserUpdate);
router.post('/username', UserUpdateController.username);

module.exports = router