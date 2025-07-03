const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/history", auth.required, userController.getHistory);
router.get("/me", auth.required, userController.getMe);

module.exports = router;
