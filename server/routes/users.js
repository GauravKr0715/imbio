const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.send(`We are at \"${req.originalUrl}\"`);
});

module.exports = Router;
