const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  cartItems: {
    type: Array,
    required: true
  },
  orders: {
    type: Array,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);