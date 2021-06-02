let enrollmodel = require("../../models/Enrollment");

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Course = require("../../models/Course");
const User = require("../../models/User");
const checkObjectId = require("../../middleware/checkObjectId");
const Enrollment = require("../../models/Enrollment");

// @route    POST api/enrollment/new/:id
// @desc     Create enrollment
// @access   Private
router.post("/new/:id", [auth, checkObjectId("id")], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { course, student, lessonsArray, enrolled } = req.body;

  try {
    const user = await User.findById(req.user.id).select("-password");

    const newEnrollment = new Enrollment({
      course,
      student,
      lessonsArray,
      enrolled,
    });

    const enrollment = await newEnrollment.save();
    res.json(enrollment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/enrollment/:id
// @desc     Get enrollment by ID
// @access   Private
router.get("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ msg: "Enrollment not found" });
    }
    res.json(enrollment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/enrollment
// @desc     Get all enrollment
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const enrollment = await Enrollment.find().sort({ date: -1 });
    res.json(enrollment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/enrollment/stats/:courseId
// @desc     Get enrollment stats
// @access   Private
router.get("/stats/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const enrollment = await Course.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ msg: "Course not found" });
    }
    await enrollment.save();

    res.json(enrollment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
