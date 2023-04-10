const { Category } = require("./category.model");

// create a category
const createCategory = async (req, res) => {
  try {
    const { title } = req.body;
    const existingCategory = await Category.findOne({ title });
    if (existingCategory !== null) {
      throw new Error("Bu bo'lim allaqachon yaratilgan!");
    }

    // Create new category
    const category = new Category({ title });
    await category.save();

    return res.status(201).json(category);
  } catch (error) {
    return res.status(405).json(error.message);
  }
};

// get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send({ categories });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// get a single category by ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({ error: "Bo'lim topilmadi" });
    } else {
      res.status(200).json(category);
    }
  } catch (err) {
    res.status(209).send(err.message);
  }
};

// update a category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    let check = await Category.findOne({ title: title });
    if (check) {
      throw new Error("Bu bo'lim allaqachon yaratilgan!");
    }
    const category = await Category.findByIdAndUpdate(
      id,
      { title: title },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!category) {
      res.status(404).json({ error: "Category not found" });
    } else {
      res.status(200).json(category);
    }
  } catch (err) {
    res.status(209).send(err.message);
  }
};

// delete a category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    await category.remove();

    res.status(200).send({ message: "Bo'lim muvaffaqiyatli o'chirildi" });

  } catch (error) {

    res.status(500).send({ message: error.message });

  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
