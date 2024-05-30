const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  images: Array,
  rating: {
    type: Array,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);