const express = require('express')
const { CategoryController } = require('./category.controller')
const categoryRoute = express.Router()
categoryRoute.get('/', async(req, res)=>{
    console.log(req.body);
})
categoryRoute.post('/', CategoryController.create)
categoryRoute.delete('/', CategoryController.delete)
categoryRoute.put('/:id', CategoryController.update)

module.exports = categoryRoute;