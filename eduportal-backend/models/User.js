const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  registrationNumber: String,
  department: String,
  dob: Date,
  yearOfJoining: Number,
});

module.exports = mongoose.model("User", userSchema);
