const mongoose = require("mongoose");

const lectorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 64,
    minLength: 3,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 64,
    minLength: 3,
  },
  avatar: {
    type: String,
    required: false
  }
});

const Lector = mongoose.model("Lectors", lectorSchema);

module.exports.Lector = Lector;