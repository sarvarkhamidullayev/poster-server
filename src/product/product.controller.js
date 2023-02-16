const { Product } = require("./product.model");
const fs = require('fs')

module.exports.ProductController = {
  create: async (req, res) => {
    try {
      const { title, category, description, measure, price } = req.body;
      const file = req.file;
      let product = await Product.findOne({title: title});
      if(product){
        throw new Error("Bu mahsulot avval yaratilgan!")
      }
      product = new Product({
        title: title,
        description: description,
        category: category,
        measure: measure,
        price: price,
        images: file.path
      })
      await product.save()
      res.status(201).json(product);
    } catch (error) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(209).send(error.message);
    }
  },
  getAll: async (req, res) => {
    try {
      const users = await Product.find().sort({ name: 1 });
      res.status(200).json(users);
    } catch (error) {
      return res.status(405).send(error);
    }
  },
  delete: async (req, res) => {
    try {
      const deletedUser = await Product.findByIdAndRemove(req.body.id);
      res.status(200).json(deletedUser);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  },
  update: async (req, res) => {
    try {
      const updatedUser = await Product.findByIdAndUpdate(
        req.body.id,
        req.body.user,
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  },
};
