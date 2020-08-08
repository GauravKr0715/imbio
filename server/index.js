const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const links = require("./routes/links");
const login = require("./routes/login");
const register = require("./routes/register");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/links", links);
app.use("/api/login", login);
app.use("/api/register", register);

mongoose.connect(
  process.env.DB_KEY,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log(mongoose.connection.readyState)
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on \"http://localhost:${PORT}\"`);
});
