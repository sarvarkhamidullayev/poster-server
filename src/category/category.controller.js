const { Product, Category } = require("./category.model");

module.exports.CategoryController = {
  create: async (req, res) => {
    try {
      let category = await Category.findOne({title: req.body.title})
      if (category) {
        throw new Error("Bu bo'lim alaqachon yaratilgan");
      }
      category = new Category({
        title: req.body.title
      });
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  },
  getAll: async (req, res) => {
    try {
      console.log("log");
        const categories = await Category.find()
        .sort({name: 1})
        res.status(200).json(categories)
    } catch (error) {
      return res.status(404).send(error.message);
    }
  },
  delete: async (req, res) => {
    try {
      const deletedCategory = await Category.findByIdAndRemove(req.body.id)
      res.status(200).json(deletedCategory)
    } catch (error) {
      return res.status(404).send(error.message);
    }
  },
  update: async (req, res) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
      res.status(200).json(updatedCategory)
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
};