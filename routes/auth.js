const express = require('express');

const authController = require('../controllers/auth');
// express.Router fungsinya supaya router dibuat sesuai kategori
const auth = express.Router();

auth.post('/register', authController.register);
auth.post('/login', authController.login);

module.exports = auth;
