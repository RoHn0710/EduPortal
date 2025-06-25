const mongoose = require("mongoose");

const MarksSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  marks: [
    {
      subject: { type: String, required: true },
      score: { type: Number, required: true },
      grade: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model("Marks", MarksSchema);
