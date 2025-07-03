const User = require("../models/User");

exports.getHistory = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "Пользователь не найден" });
  res.json(user.history);
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "Пользователь не найден" });
  res.json({ email: user.email, id: user._id });
};
