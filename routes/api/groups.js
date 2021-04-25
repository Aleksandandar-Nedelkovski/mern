const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Group = require("../../models/Group");
const Event = require("../../models/Event");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route  GET api/groups
// @desc   Get all groups
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const groups = await Group.find().sort({ date_created: -1 });
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/groups
// @desc   Create or update a group
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("course", "A course is required").not().isEmpty(),
      check("name", "Name exceeded character limit of 50").custom(
        (value) => value.length <= 50
      ),
      check(
        "description",
        "Description exceeded character limit of 150"
      ).custom((value) => value.length <= 150),
      check("max_members", "Exceeded maximum of 500 members").custom(
        (value) => parseInt(value) <= 500
      ),
      check("max_members", "Minimum 2 members required").custom(
        (value) => parseInt(value) >= 2
      ),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorMsgs = errors.array().map((err) => err.msg);
      return res.status(400).json({
        msg: errorMsgs,
      });
    }

    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ msg: "Profile has not been created yet" });
    }

    const { name, course, description, max_members, public, id } = req.body;

    /* CHECK IF A GROUP UPDATE IS DONE BY A HOST */
    if (id) {
      const group = await Group.findById(id);
      if (group) {
        let memberIndex = group.members.filter(
          (member) => member.user.toString() === req.user.id.toString()
        );
        if (memberIndex.length > 0) {
          if (memberIndex[0].host === false) {
            return res
              .status(401)
              .json({ msg: "You are not a host of this group" });
          }
        } else {
          return res
            .status(401)
            .json({ msg: "You are not a member of this group" });
        }
      }
    }
    /* CHECK IF A GROUP UPDATE IS DONE BY A HOST */

    const groupFields = {};
    if (name) groupFields.name = name;
    if (course) groupFields.course = course;
    if (description) groupFields.description = description;
    if (max_members) groupFields.max_members = max_members;
    if (public) groupFields.public = public;
    if (!id) {
      groupFields.members = [];
      groupFields.members.push({
        user: req.user.id,
        host: true,
      });
    }

    try {
      if (id) {
        let group = await Group.findByIdAndUpdate(
          id,
          {
            $set: groupFields,
          },
          {
            new: true,
          }
        );

        return res.json(group);
      }

      const newGroup = new Group(groupFields);
      const group = await newGroup.save();

      res.json(group);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  GET api/groups/byCourse
// @route  Get all the groups by the user's course list
// @access Private
router.get("/byCourse", auth, async (req, res) => {
  try {
    /* Get the profile and check if it exists */
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not created yet" });
    }

    /* Query groups by the courses the user is in */
    const { courses } = profile;
    const groups = await Group.find({ course: { $in: courses } });
    console.log("groups", groups);
    /* Send back the query */
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  GET api/groups/byCourse/:id
// @desc   Get all groups of a certain course
// @access Private
router.get("/byCourse/:course", auth, async (req, res) => {
  try {
    let groups = await Group.find({ course: req.params.course });

    if (!groups) {
      res.status(404).json({
        msg: `unfortunately there are no study groups for ${req.params.course} as of now`,
      });
    }

    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  GET api/groups/:id
// @desc   Get group by id
// @access Private
router.get("/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    res.json(group);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Group not found" });
    }
    res.status(500).send("Server error");
  }
});
