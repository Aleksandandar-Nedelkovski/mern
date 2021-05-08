const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Category = require("../../models/Category");
const User = require("../../models/User");

router.post("/category/add", auth, (req, res) => {
  //req.body
  if (!req.body) {
    return res.status(400).send("request body is missing");
  }

  let model = new Category(req.body);
  model
    .save()
    .then((doc) => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post(
  "/add",
  auth,
  check("text", "Text is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { courseName } = req.body;

    try {
      // const user = await User.findById(req.user.id).select("-password");

      const newCategory = new Category({
        courseName,
      });

      const category = await newCategory.save();
      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

    // if (!req.body) {
    //   return res.status(400).send("request body is missing");
    // }

    // let model = new catmodel(req.body);
    // model
    //   .save()
    //   .then((doc) => {
    //     if (!doc || doc.length === 0) {
    //       return res.status(500).send(doc);
    //     }
    //     res.status(200).send(doc);
    //   })
    //   .catch((err) => {
    //     res.status(500).json(err);
    //   });
  }
);

router.get("/category", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  Category.findOne({
    _id: req.query.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/category/", (req, res) => {
  catmodel
    .findOneAndUpdate(
      {
        _id: req.query.id,
      },
      req.body,
      {
        new: true,
      }
    )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/categories", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  Category.find()
    .then((doc) => {
      // res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
      res.setHeader("Content-Range", "users 0-5/5");
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
