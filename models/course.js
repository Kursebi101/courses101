const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  formatType: {
    type: Number,
    required: true,
  },
  category: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
    maxlength: 11,
  },
  hasCertificate: {
    type: Boolean,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true
  },
  daySchedule: {
    type: Array,
    required: false
  },
  hourSchedule: {
    type: Array,
    required: false
  },
  raiting: {
    type: Number,
    required: false
  },
  reviewsCount: {
    type: Number,
    required: false
  }
});

const Course = mongoose.model("Courses", courseSchema);

module.exports.Course = Course;