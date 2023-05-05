const mongoose = require("mongoose");

const academySchema = new mongoose.Schema({
  academyName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: false
  },
  courses: {
    type: Array,
    required: false
  },
  lectors: {
    type: Array,
    required: false
  }
});

const Academy = mongoose.model("Academies", academySchema);

module.exports.Academy = Academy;