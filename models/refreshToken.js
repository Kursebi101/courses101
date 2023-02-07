const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});


const RefreshToken = mongoose.model("RefreshTokens", refreshTokenSchema);

module.exports.RefreshToken = RefreshToken;
