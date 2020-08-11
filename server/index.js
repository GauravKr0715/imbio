const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const links = require("./routes/links");
const login = require("./routes/login");
const register = require("./routes/register");
// const user_name = require("./routes/user_name");
const verifyUser = require("./routes/verifyUser");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/links", links);
app.use("/api/login", login);
app.use("/api/register", register);
// app.use("/api/:user_name", user_name);
app.use("/api/verifyUser", verifyUser);

mongoose.connect(
  process.env.DB_KEY,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log(mongoose.connection.readyState)
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on \"http://localhost:${PORT}\"`);
});
