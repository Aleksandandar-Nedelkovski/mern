const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//post model
const Post = require("../../models/Post");
const Profilet = require("../../models/Profile");

//Validation
const validatePostInput = require("../../validation/post");

//@route  GET api/posts
//@desc   GET posts
//@access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ noPostsFound: "No posts found" }));
});

//@route  GET api/posts/:id
//@desc   GET post by id
//@access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ noPostFound: "No post found with that ID" })
    );
});

//@route  POST api/posts
//@desc   Create a post
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });
    newPost.save().then((post) => res.json(post));
  }
);

//@route  DELETE api/posts
//@desc   DELETE a post
//@access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ usee: req.params.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          //check for post owner
          if (post.user.toString() != req.user.id) {
            return res
              .status(401)
              .json({ notAuthorized: "User not authorized" });
          }
          //delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ postNotFound: "Post not found" })
        );
    });
  }
);

module.exports = router;
