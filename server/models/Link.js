const mongoose = require("mongoose");

const Links = new mongoose.Schema({
  title: String,
  link: String,
});

const linkSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  links: [Links],
});

module.exports = mongoose.model("link", linkSchema);
