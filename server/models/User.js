const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  history: [
    {
      testId: String,
      score: Number,
      resultText: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
