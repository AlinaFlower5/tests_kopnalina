const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const Test = require("../models/Test");
async function importTests() {
  await mongoose.connect(process.env.MONGODB_URI);
  const dataPath = path.join(__dirname, "data.json");
  const tests = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  await Test.deleteMany({});
  await Test.insertMany(tests);
  console.log("Тесты успешно импортированы");
  process.exit();
}
importTests();
