const { default: mongoose } = require('mongoose');
const sendPost = require('../../bot');
const { Product } = require('../product/product.model');
const { Post } = require('./post.model');

// GET all posts
const getAllPosts = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findById(groupId).populate('posts');
    const posts =  group.posts.map(post => post)
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a post by ID
const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate('product');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE a post
const createPost = async (req, res) => {
  const { data } = req.body;
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      await Promise.all(data.map(async (productId) => {
        const product = await Product.findById(productId);
        const id = await sendPost(product);
        const post = new Post({
          id: id,
          isActive: true,
          product: product.id,
        });
        await post.save();
      }));
    });

    return res.status(201).json({ message: 'Post created successfully!' });
  } catch (err) {
    console.log(err);
    console.log(err.message);
    return res.status(500).json({ error: 'Error creating post!' });
  } finally {
    session.endSession();
  }
};

// UPDATE a post by ID
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.isActive = isActive;
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a post by ID
const deletePost = async (req, res) => {
  const { groupId } = req.params;
  const { id } = req.body;
  try {
    const deletedPost = await Post.findByIdAndDelete(id)
    if(deletedPost){
      await Group.findByIdAndUpdate(groupId, {$pull: {posts: deletePost._id}})
    }
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};