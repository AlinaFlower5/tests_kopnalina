const Result = require("../models/Result");
const Test = require("../models/Test");
const User = require("../models/User");
const { nanoid } = require("nanoid");

exports.submit = async (req, res) => {
  const { answers } = req.body;
  const test = await Test.findById(req.params.id);
  if (!test) return res.status(404).json({ message: "Тест не найден" });
  let score = 0;
  test.questions.forEach((q, i) => {
    const answer = answers[i];
    if (answer != null && q.options[answer]) {
      score += q.options[answer].value;
    }
  });
  let resultText = "Рекомендация не найдена";
  if (Array.isArray(test.results)) {
    const found = test.results.find((r) => score >= r.min && score <= r.max);
    if (found) resultText = found.text;
  }
  const shareCode = nanoid(10);
  let userId = req.user ? req.user.id : null;
  const result = await Result.create({
    userId,
    testId: test._id,
    score,
    resultText,
    shareCode,
  });
  if (userId) {
    await User.findByIdAndUpdate(userId, {
      $push: { history: { testId: test._id, score, resultText } },
    });
  }
  res.json({ score, resultText, shareCode });
};

exports.getByCode = async (req, res) => {
  const result = await Result.findOne({ shareCode: req.params.code });
  if (!result) return res.status(404).json({ message: "Результат не найден" });
  res.json(result);
};
