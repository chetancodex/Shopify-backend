const express = require('express');
const UserController = require('../controller/usercontroller');
const router = express.Router();

//Register User
router.post('/register', UserController.register);
// Sign In
router.post('/signIn', UserController.signIn);



module.exports = router