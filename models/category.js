const mongoose = require("mongoose");

const catSchema = new mongoose.Schema({
  catID: {
    type: Number,
    required: true
  },
  catName: {
    type: String,
    required: true
  }
});

const Category = mongoose.model("Category", catSchema);

module.exports.Category = Category;