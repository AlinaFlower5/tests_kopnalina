const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  score: Number,
  resultText: String,
  shareCode: { type: String, unique: true, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", resultSchema);
