const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

router.get("/", testController.getAll);
router.get("/:id", testController.getOne);

module.exports = router;
