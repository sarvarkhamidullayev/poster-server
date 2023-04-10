const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  id: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
});

const Post = mongoose.model('Post', schema);

module.exports.Post = Post;