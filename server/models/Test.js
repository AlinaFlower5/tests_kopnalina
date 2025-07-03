const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: String,
  options: [
    {
      text: String,
      value: Number,
    },
  ],
});

const resultSchema = new mongoose.Schema({
  min: Number,
  max: Number,
  text: String,
});

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ["psychological", "professional", "personality"],
    required: true,
  },
  description: String,
  questions: [questionSchema],
  results: [resultSchema],
});

module.exports = mongoose.model("Test", testSchema);
