const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  author: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

const Review = mongoose.model("Reviews", reviewSchema);

module.exports.Review = Review;