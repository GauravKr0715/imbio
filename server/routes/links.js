const express = require("express");
const Router = express.Router();
const User = require("../models/User");
const Link = require("../models/Link");
const verify = require("../verifyToken");
const mongoose = require("mongoose");
const { create } = require("../models/User");

Router.get("/", verify, async (req, res) => {
  // if (req.headers.id === "5f30f4fb28f3b75ec49a21fe") {
  //   let n = 0;
  //   const retObj = {};
  //   const retArr = [];
  //   const receivedData = await User.find({ _id: { $ne: req.headers.id } });
  //   receivedData.forEach(async (user) => {
  //     const linkObj = {};
  //     const links = await Link.findOne({ user_id: user._id });
  //     if (links) {
  //       for (i = 0; i < links.links.length; i++) {
  //         linkObj[`link${i + 1}`] = links.links[i];
  //         // console.log(links.links[i]);
  //       }
  //     }
  //     // console.log(linkObj);
  //     const userObj = {
  //       id: user._id,
  //       username: user.username,
  //       links: linkObj,
  //     };
  //     // console.log(userObj);

  //     retObj[`user${n + 1}`] = userObj;
  //     n++;
  //     console.log(retObj);
  //   });
  //   // console.log(retObj);
  //   return res.json(retObj);
  // }

  try {
    const links = await Link.findOne({ user_id: req.headers.id });
    res.status(200).json(links.links);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
  //   const user = User.findOne({ id: req.user._id });
  //   if (!user) return res.send("not found");
  //   res.send(req.user);
});

Router.get("/:user_name", async (req, res) => {
  const user_name = req.params.user_name;
  const user = await User.findOne({ username: user_name });
  if (!user) return res.status(404).json({ message: "No user found!!" });
  const result = await Link.findOne({ user_id: user._id });
  return res.json(result.links);
});

Router.post("/", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  const exists = await Link.findOne({ user_id: user._id });
  // console.log(req.body.title + " and " + req.body.link);
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

Router.delete("/", verify, async (req, res) => {
  const userID = req.body.userID;
  const linkID = req.body.linkID;
  console.log(userID + " and " + linkID);
  try {
    const deletedLink = await Link.updateOne(
      { user_id: userID },
      { $pull: { links: { _id: linkID } } },
      { new: true }
    );
    res.status(200).json(deletedLink);
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

module.exports = Router;
