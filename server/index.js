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
  "mongodb+srv://gaurav_kr:gauravKr@cluster0.tgrla.mongodb.net/Cluster0?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(mongoose.connection.readyState);
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on \"http://localhost:${PORT}\"`);
});
