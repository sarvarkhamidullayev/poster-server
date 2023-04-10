const { Product } = require("./product.model");
const fs = require('fs');
const sendPost = require("../../bot");
const { default: mongoose } = require("mongoose");
// GET all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    .sort({title: 1})
    return res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error : err.message });
  }
  
};

// CREATE a new product
const createProduct = async (req, res) => {
  try {
    const { title, category, description, measure, price } = req.body;
    const file = req.file;
    let product = await Product.findOne({title: title})
    if (product) {
      throw new Error("Bu mahsulot allaqachon yaratilgan!");
    }
    product = new Product({
      title: title,
      description: description,
      category: category,
      measure: measure,
      price: price,
      images: '/uploads/'+file.filename
    });
    await product.save();
   
    return res.status(201).json(product);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({message: error.message});
  } 
};

// UPDATE a product by ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productWithSameTitle = await Product.findOne({ title: req.body.title });
    if (productWithSameTitle && id !== productWithSameTitle._id.toString()) {
      throw new Error('Bu nom bilan mahsulot allaqachon yaratilgan!');
    }

    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: 'Mahsulot topilmadi!' });
    }

    
    product.set(req.body);

    if(req.file){
      const oldPhoto = product.images[0];
      product.images.pop();
      product.images.push('/uploads/' + req.file.filename);
      if(oldPhoto){
        fs.unlinkSync('public/' + oldPhoto);
      }
    }
     await product.save();

    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(422).json(err.message);
  }
};

// DELETE a product by ID
const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: 'Mahsulot topilmadi!' });
    }
    const removedProduct = await product.remove();
    if(removedProduct){
      fs.unlinkSync("public/" + product.images[0]);
    }
    res.status(200).json(removedProduct);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

const postProducts = async (req, res) => {
  try {
    req.body.data.forEach(async(item) => {
      let product = await Product.findById(item)
     sendPost(product)
    });
    res.status(200).json({ message: 'Mahsulotlar o\'chirildi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  postProducts
};