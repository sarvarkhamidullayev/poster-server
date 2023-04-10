const express = require('express');
const checkToken = require('../../middlewares/checkToken');
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../category/category.controller');
const router = express.Router();

// Create a category
router.post('/', checkToken, createCategory);

// Get all categories
router.get('/', getAllCategories);

// Get a single category by ID
router.get('/:id', getCategoryById);

// Update a category by ID
router.put('/:id', checkToken, updateCategory);

// Delete a category by ID
router.delete('/:id',checkToken, deleteCategory);

module.exports = router;
