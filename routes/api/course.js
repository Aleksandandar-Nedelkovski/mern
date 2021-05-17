const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Course = require("../../models/Course");
const User = require("../../models/User");

router.post(
  "/by/:id",
  auth,
  check("courseName", "Text is required").notEmpty(),
  check("category", "Please specify the type of event").notEmpty(),
  check(
    "description",
    "Please give a description with at least 20 characters"
  ).isLength({ min: 20 }),
  async (req, res) => {
    const errors = validationResult(req);
    const { courseName, description, category, image } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newCourse = new Course({
        user: req.user.id,
        name: user.name,
        courseName,
        description,
        category,
        image,
        // instructor: {
        //   name: user.name,
        //   avatar: user.avatar,
        // },
      });

      const course = await newCourse.save();

      return res.json(course);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/courses/published
// @desc     Get all courses
// @access   Private
router.get("/published", auth, async (req, res) => {
  try {
    const courses = await Course.find().sort({ date: -1 });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
