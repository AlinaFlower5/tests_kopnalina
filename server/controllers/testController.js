const Test = require("../models/Test");

exports.getAll = async (req, res) => {
  const tests = await Test.find();
  res.json(tests);
};

exports.getOne = async (req, res) => {
  const test = await Test.findById(req.params.id);
  if (!test) return res.status(404).json({ message: "Тест не найден" });
  res.json(test);
};
