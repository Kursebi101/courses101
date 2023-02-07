const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
  roleID: {
    type: Number,
    required: true
  },
  roleName: {
    type: String,
    required: true
  }
});

const Role = mongoose.model("Roles", rolesSchema);

module.exports.Role = Role;