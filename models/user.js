const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    maxlength: 64,
    minlength: 3,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 64,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    maxlength: 256,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  roleType: {
    type: Number,
    required: true,
  },
  pID: {
    type: Number,
    required: false
  },
  ipAddress: {
    type: String,
    required: false
  }
});

const User = mongoose.model("Users", userSchema);

module.exports.User = User;