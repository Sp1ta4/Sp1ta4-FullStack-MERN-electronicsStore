const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: {
    type: Number,
    required: true,
    minimum: 1,
    maximum: 99,
  }
});

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
  cartItems: [cartItemSchema],
  orders: {
    type: Array,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);