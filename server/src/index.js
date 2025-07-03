const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", require("../routes/auth"));
app.use("/api/tests", require("../routes/tests"));
app.use("/api", require("../routes/results"));
app.use("/api/user", require("../routes/user"));
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
