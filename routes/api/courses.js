const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Course = require("../../models/Course");
const User = require("../../models/User");
// const Lesson = require("../../models/Lesson");
const Enrollment = require("../../models/Enrollment");
const checkObjectId = require("../../middleware/checkObjectId");

// @route    POST api/courses
// @desc     Create a course
// @access   Private
router.post(
  "/",
  auth,
  // check("courseName", "Text is required").notEmpty(),
  check("category", "Please specify the type of event").notEmpty(),
  // check(
  //   "description",
  //   "Please give a description with at least 20 characters"
  // ).isLength({ min: 20 }),
  async (req, res) => {
    const errors = validationResult(req);
    const { name, description, category, image } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newCourse = new Course({
        user: req.user.id,
        name,
        description,
        category,
        image,
        instructor: {
          user: req.user.id,
          name: user.name,
        },
      });

      const course = await newCourse.save();

      res.json(course);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/courses
// @desc     Get all courses
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const courses = await Course.find().sort({ date: -1 });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/courses/:id
// @desc     Get course by ID
// @access   Private
router.get("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/courses/defaultphoto
// @desc     Get all courses
// @access   Private
router.get("/defaultphoto ", auth, async (req, res) => {
  try {
    const defaultPhoto = res.sendFile(process.cwd() + defaultImage);
    res.json(defaultPhoto);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/courses/photo
// @desc     Get all courses
// @access   Private
router.get("/photo", auth, async (req, res, next) => {
  if (req.course.image.data) {
    res.set("Content-Type", req.course.image.contentType);
    return res.send(req.course.image.data);
  }
  next();
});

// @route    POST api/courses/lesson/:id
// @desc     Comment on a post
// @access   Private
router.post(
  "/lesson/:id",
  auth,
  checkObjectId("id"),
  check("title", "Title is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const course = await Course.findById(req.params.id);

      const newLesson = {
        title: req.body.title,
        content: req.body.content,
        resource_url: req.body.resource_url,
        name: user.name,
        user: req.user.id,
      };

      course.lessons.unshift(newLesson);

      await course.save();

      res.json(course.lessons);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    POST api/courses/enrollment/:id
// @desc     Create enrollment
// @access   Private
router.post("/enrollment/:id", auth, checkObjectId("id"), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    const course = await Course.findById(req.params.id);
    const newEnrollment = new Enrollment({
      courseId: req.params.id,
      studentId: user,
      lessonStatus: req.body.lessonsArray,
      enrolled: req.body.enrolled,
    });

    course.enrollments.unshift(newEnrollment);
    await course.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
