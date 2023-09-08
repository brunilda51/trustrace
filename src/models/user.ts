const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  date_of_birth: Date,
  profilePicture: String,
  role: String,
  status: String,
  createdAt: Date,
  lastLoginAt: Date,
});

export default mongoose.model("User", userSchema);
