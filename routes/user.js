const express = require('express');

const userController = require('../controllers/user')
const authMiddleware = require('../middleware/auth')
const user = express.Router();

// menambahkan middleware sebelum akses userProfile

user.get('/user',authMiddleware.verifyToken, userController.userProfile)

module.exports = user;