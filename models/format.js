const mongoose = require("mongoose");

const formatsSchema = new mongoose.Schema({
  formatName: {
    type: String,
    required: true
  }
});

const Format = mongoose.model("Formats", formatsSchema);

module.exports.Format = Format;