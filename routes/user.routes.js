const express = require('express');
const UserController = require('../controller/usercontroller');
const router = express.Router();
const checkAuth = require('../middleware/auth')

//Register User
router.post('/register', UserController.register);
// Sign In
router.post('/signIn', UserController.signIn);

router.delete('/:id',UserController.delete);



module.exports = router