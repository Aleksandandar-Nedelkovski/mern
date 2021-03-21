const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load User Model
const User = require("../../models/User");

//@route  GET api/users/test
//@desc   Tests users route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

//@route  GET api/users/register
//@desc   Register user
//@access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm", //default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//@route  GET api/users/login
//@desc   Login user / return JWT token
//@access Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({ email })
    .then((user) => {
      //check the user
      if (!user) {
        return res.status(404).json({ email: "User not found" });
      }
      //check psw
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            //user match
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
            }; //create JWT payload

            //sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 36000 },
              (err, token) => {
                res.json({
                  success: true,
                  token: token,
                });
              }
            );
          } else {
            return res.status(400).json({ password: "Error" });
          }
        })
        .catch();
    })
    .catch();
});

//@route  GET api/users/current
//@desc   return current user
//@access private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //return user
    res.json({
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      avatar: req.user.avatar,
    });
  }
);

module.exports = router;
