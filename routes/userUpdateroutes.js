const express = require('express');
const UserUpdateController = require('../controller/userupdatecontroller');
const router = express.Router();

// user update 
router.post('/:username', UserUpdateController.postUserUpdate)

module.exports = router