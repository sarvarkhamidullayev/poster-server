const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  measure: {
    type: String,
    required: true,
    enum: ["kg", "metr", "dona", "litr"],
  },
  category: {
    type: String,
    required: true
  },
  images: {
    type: Array,
  },
  price: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports.Product = Product;