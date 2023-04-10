const express = require('express');
const { authController } = require('./auth.controller');
const route = express.Router()

route.post('/signin', authController.signin)
route.post('/psw', authController.resetPassword)

module.exports = route;