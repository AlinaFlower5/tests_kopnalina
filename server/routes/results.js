const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController");
const auth = require("../middleware/auth");

router.post("/tests/:id/submit", auth.optional, resultController.submit);
router.get("/share/:code", resultController.getByCode);

module.exports = router;
