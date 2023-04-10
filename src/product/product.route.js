const express = require('express');
const checkToken = require('../../middlewares/checkToken');
const multer = require('../../multer');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, postProducts } = require('./product.controller');
const router = express.Router();

// GET all products
router.get('/', getAllProducts);

// GET a single product by ID
router.get('/:id', getProductById);

// CREATE a new product
router.post('/', checkToken, multer, createProduct);


// UPDATE a product by ID
router.put('/:id', multer, updateProduct);

// DELETE a product by ID
router.delete('/:id', checkToken, deleteProduct);

module.exports = router;