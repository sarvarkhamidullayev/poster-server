const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  role: {
    type: String,
    default: 'user'
  },
  nickname: {
    type: String,
    required: false
  },
  tgId: {
    type: Number,
    required: false,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  login: {
    type: String,
    required: function() {
      return this.role === 'admin';
    }
  },
  password: {
    type: String,
    required: function() {
      return this.role === 'admin';
    }
  }
});

const User = mongoose.model('User', UserSchema);

module.exports.User = User;