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

//@route  POST api/posts/like/:id
//@desc   like post
//@access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ usee: req.params.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyLiked: "User already liked this post" });
          }
          //add user id to likes array
          post.likes.unshift({ user: req.user.id });
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postNotFound: "Post not found" })
        );
    });
  }
);

//@route  POST api/posts/unlike/:id
//@desc   like post
//@access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ usee: req.params.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length == 0
          ) {
            return res
              .status(400)
              .json({ notLiked: "You have not yet liked this post" });
          }
          //get remove index
          const removeIndex = post.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);

          //splice out of array
          post.likes.splice(removeIndex, 1);

          //save
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postNotFound: "Post not found" })
        );
    });
  }
);

//@route  POST api/posts/comment/:id
//@desc   add comment to post
//@access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };
        //add to comment array

        post.comments.unshift(newComment);

        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postNotFound: "Post not found" }));
  }
);

//@route  DELETE api/posts/comment/:id/:comment_id
//@desc   delete comment from post
//@access Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        //check if comment exists
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentDoesNotExists: "Comment does not exists" });
        }
        //remove index
        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        //splice comment out of array
        post.comment.splice(removeIndex, 1);
        post.save().then((post) => res.json(post));
      })
      .catch((err) =>
        res.status(404).json({ commentNotFound: "Comment not found" })
      );
  }
);

module.exports = router;
