const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  dob: { type: Date, required: true },
  yearOfJoining: { type: Number, required: true },
  parentsName: { type: String, default: "" },   // optional
  batch: { type: String, default: "" },         // optional
  degree: { type: String, default: "" },        // optional
  branch: { type: String, default: "" },        // optional
});

module.exports = mongoose.model("StudentProfile", studentProfileSchema);
