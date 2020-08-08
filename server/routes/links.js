const express = require("express");
const Router = express.Router();
const User = require("../models/User");
const Link = require("../models/Link");
const verify = require("../verifyToken");
const mongoose = require("mongoose");
const { create } = require("../models/User");

Router.get("/", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  res.json(user);
  //   const user = User.findOne({ id: req.user._id });
  //   if (!user) return res.send("not found");
  //   res.send(req.user);
});

Router.post("/", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  const exists = await Link.findOne({ user_id: user._id });
  const newLink = {
    title: req.body.title,
    link: req.body.link,
  };
  if (exists) {
    const updatedLink = await Link.updateOne(
      { user_id: user._id },
      { $push: { links: newLink } }
    );
    return res.json(updatedLink);
  }
  try {
    const createdLink = new Link();
    createdLink.user_id = user._id;
    createdLink.links.push(newLink);
    const savedLink = await createdLink.save();
    res.json(savedLink);
  } catch (error) {
    res.json({
      message: error,
    });
  }

  //   const user = User.findOne({ id: req.user._id });
  //   if (!user) return res.send("not found");
  //   res.send(req.user);
});

module.exports = Router;
