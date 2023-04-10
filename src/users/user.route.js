const express = require('express')
const checkToken = require('../../middlewares/checkToken')
const { userController } = require('./user.controller')
const route = express.Router()

route.get('/',  userController.getAll)
route.post('/', userController.create)
route.delete('/:id', userController.delete)
route.put('/:id', userController.update)

module.exports = route;