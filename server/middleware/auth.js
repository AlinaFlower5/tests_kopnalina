const jwt = require("jsonwebtoken");

exports.required = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Нет токена" });
  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Неверный токен" });
  }
};

exports.optional = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next();
  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {}
  next();
};
