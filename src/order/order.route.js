const express = require('express');
const checkToken = require('../../middlewares/checkToken');
const { updateCategory } = require('../category/category.controller');
const router = express.Router();
const { createOrder, getAllOrders, updateOrderById } = require('./order.controller');

// Create a new order
router.post('/', createOrder);

// Get all orders
router.get('/', getAllOrders);

// Update an existing order
router.put('/:id', checkToken,  updateOrderById);


module.exports = router;createOrder