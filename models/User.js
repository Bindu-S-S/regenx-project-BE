const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  token: String,
  history: [],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
