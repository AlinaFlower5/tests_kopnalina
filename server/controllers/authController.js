const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Пользователь уже существует" });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash });
    res.status(201).json({ message: "Регистрация успешна" });
  } catch (e) {
    res.status(500).json({ message: "Ошибка регистрации" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Неверный email или пароль" });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid)
      return res.status(400).json({ message: "Неверный email или пароль" });
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ token, user: { email: user.email, id: user._id } });
  } catch (e) {
    res.status(500).json({ message: "Ошибка входа" });
  }
};
