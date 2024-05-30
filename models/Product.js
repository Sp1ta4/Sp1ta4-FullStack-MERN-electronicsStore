const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  specifications: {
    type: Object,
    required: true
  },
  colors: Array,
  price: {
    type: Number,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  customerReviews: {
    type: Array,
    ref: 'Review'
  },
  rating: {
    type: Number,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);