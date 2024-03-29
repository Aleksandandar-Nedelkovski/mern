const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const checkObjectId = require("../../middleware/checkObjectId");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["_id", "name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/profile
// @desc   Create or update a user profile
// @access Private

router.post(
  "/",
  auth,
  check("status", "Status is required").notEmpty(),
  check("bio", "Bio is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const { ...rest } = req.body;

    // build a profile
    const profileFields = {
      user: req.user.id,
      ...rest,
    };

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/profile/byid/:id
// @desc   Get a profile by id
// @access Public
router.get("/byid/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate("user", [
      "name",
      "avatar",
    ]);

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  "/user/:user_id",
  checkObjectId("user_id"),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id,
      }).populate("user", ["_id", "name", "avatar"]);

      if (!profile) return res.status(400).json({ msg: "Profile not found" });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove user posts
    // Remove profile
    // Remove user
    await Promise.all([
      Post.deleteMany({ user: req.user.id }),
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id }),
    ]);

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
  "/experience",
  auth,
  check("title", "Title is required").notEmpty(),
  check("company", "Company is required").notEmpty(),
  check("from", "From date is required and needs to be from the past")
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  "/education",
  auth,
  check("school", "School is required").notEmpty(),
  check("degree", "Degree is required").notEmpty(),
  check("fieldofstudy", "Field of study is required").notEmpty(),
  check("from", "From date is required and needs to be from the past")
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

// // @route  GET api/profile/buddyRequests
// // @desc   Get the profiles of a user's buddy requests
// // @access Private
// router.get("/buddyRequests", auth, async (req, res) => {
//   try {
//     // Get the user's profile and check if it exists
//     const profile = await Profile.findOne({ user: req.user.id });
//     if (!profile) {
//       return res.status(401).json({ msg: "You did not make your profile yet" });
//     }

//     const profiles = await Profile.find({
//       user: { $in: profile.requests },
//     }).populate("user", ["name", "avatar"]);
//     res.json(profiles);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// @route  GET api/profile/invites
// @desc   Get the groups that sent an invite
// @access Private
// @route  GET api/profile/byCourse/:courses
// @desc   Get all profiles by the user's courses
// @access Private
// @note   Implement pagination using (skip & limit aggregators) if ever becomes popular
router.get("/byCourse/:courses", auth, async (req, res) => {
  try {
    let courseArray = req.params.courses.split(",");
    const profiles = await Profile.find({
      courses: { $in: courseArray },
    }).populate("user", ["_id", "name", "avatar"]);

    /* remove the user from the list TODO: Test this*/
    const removeIndex = profiles
      .map((prof) => prof.user._id.toString())
      .indexOf(req.user.id);
    console.log(removeIndex);
    if (removeIndex > -1) {
      profiles.splice(removeIndex, 1);
    }

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/profile/request
// @desc   Get friend requests
// @access Private
router.get("/request", auth, async (req, res) => {
  try {
    //test
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res
        .status(404)
        .json({ msg: "You have not created your profile yet" });
    }

    res.json(profile.requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/profile/request/:profile_id
// @desc   Send a buddy request
// @access Private
router.put("/request/:profile_id", auth, async (req, res) => {
  try {
    /* Pull out profile and check if it exists */
    const fromProfile = await Profile.findOne({ user: req.user.id });
    if (!fromProfile) {
      return res
        .status(404)
        .json({ msg: "You have not created a profile yet" });
    }

    const fromUser = await User.findById(fromProfile.user);

    /* Check if its the same person */
    if (fromProfile._id.toString() === req.params.profile_id) {
      return res.status(401).json({ msg: "Lol thats you, what are you doing" });
    }

    /* Pull out profile theyre requesting to and check if it exists */
    const toProfile = await Profile.findById(
      req.params.profile_id
    ).populate("user", ["name"]);
    if (!toProfile) {
      return res
        .status(404)
        .json({ msg: "The user you're requesting to does not exist" });
    }
    const toUser = toProfile.user._id;

    /* Check if they're friends already */
    let friendIndex = toProfile.buddies
      .map((buddy) => buddy.toString())
      .indexOf(req.user.id);
    if (friendIndex > -1) {
      return res
        .status(401)
        .json({ msg: "You are already friends with this user" });
    }

    /* Check if the request was sent already */
    let requestIndex = toProfile.requests
      .map((request) => request.toString())
      .indexOf(req.user.id);
    if (requestIndex > -1) {
      return res
        .status(401)
        .json({ msg: "You have already sent a friend request" });
    }

    /* Check if a request was sent back already, cancel both requests and make them friends */
    requestIndex = fromProfile.requests.indexOf(toUser);
    if (requestIndex > -1) {
      fromProfile.requests.splice(requestIndex, 1);
      fromProfile.buddies.unshift(toUser);
      toProfile.buddies.unshift(req.user.id);
      await fromProfile.save();
      await toProfile.save();
      return res.json({
        msg: `${toProfile.user.name} already sent a request to you, so now you're friends`,
      });
    }

    /* Send the request */
    toProfile.requests.unshift(req.user.id);
    await toProfile.save();

    await pushNotification(
      {
        message: `You have recieved a study buddy request from ${fromUser.name}`,
        profile: `${fromProfile._id}`,
      },
      toProfile._id
    );

    sendLivePush(
      `${toUser.toString()}`,
      `${fromUser.name} has sent you a buddy request`
    );

    res.json({
      msg: `Buddy request successfully sent to ${toProfile.user.name}`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  DELETE api/profile/request/:profile_id
// @desc   Decline a buddy request
// @access Private
router.delete("/request/:profile_id", auth, async (req, res) => {
  try {
    /* Pull out the profile and check if it exists */
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res
        .status(404)
        .json({ msg: "You have not created a profile yet" });
    }

    /* Pull out their profile and get their user */
    const reqProfile = await Profile.findById(req.params.profile_id);
    const reqUser = reqProfile.user;

    /* Check if the request exists */
    let removeIndex = profile.requests.indexOf(reqUser);
    if (removeIndex < 0) {
      return res
        .status(401)
        .json({ msg: "This user has not sent a request to you" });
    }

    /* Remove the request and return */
    profile.requests.splice(removeIndex, 1);
    await profile.save();
    res.json({ msg: "Buddy request has been declined" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  PUT api/profile/buddy/:buddy_id
// @desc   Add buddy to profile
// @access Private
router.put("/buddy/:buddy_id", auth, async (req, res) => {
  try {
    // Get the users profile and check if it exists
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(401).json({ msg: "You did not make your profile yet" });
    }

    // Get their profile and check if their profile exists
    const buddyProfile = await Profile.findById(req.params.buddy_id);
    if (!buddyProfile) {
      return res
        .status(404)
        .json({ msg: "Cannot add, their profile does not exist" });
    }

    // Check if the friend request was sent
    let removeIndex = profile.requests.indexOf(buddyProfile.user);
    if (removeIndex < 0) {
      return res
        .status(401)
        .json({ msg: "The user did not send a request to you" });
    }

    // Add the new buddy, save & return
    profile.requests.splice(removeIndex, 1);
    profile.buddies.unshift(buddyProfile.user);
    buddyProfile.buddies.unshift(req.user.id);
    await buddyProfile.save();
    await profile.save();

    res.json(profile.buddies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  DELETE api/profile/buddy/:buddy_id
// @desc   Delete buddy from profile
// @access Private
router.delete("/buddy/:buddy_id", auth, async (req, res) => {
  try {
    // Get the user's profile and check if it exists
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(401).json({ msg: "You did not make your profile yet" });
    }

    // Get the buddies profile and check if it exists
    const buddyProfile = await Profile.findById(req.params.buddy_id);
    if (!buddyProfile) {
      return res.status(401).json({
        msg: "Profile not found, You are not friends with this person",
      });
    }

    // Get remove index, see if they were buddies in the first place
    const removeIndex = profile.buddies.indexOf(buddyProfile.user);
    if (removeIndex < 0) {
      return res
        .status(400)
        .json({ msg: "You are not friends with this person" });
    }

    // Remove user from their friends list
    const removeIndex2 = buddyProfile.buddies
      .map((buddy) => buddy.toString())
      .indexOf(req.user.id);
    if (removeIndex > -1) {
      buddyProfile.buddies.splice(removeIndex2, 1);
      await buddyProfile.save();
    }

    // Unfriend the buddy, save & return
    profile.buddies.splice(removeIndex, 1);
    await profile.save();
    res.json(profile.buddies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  GET api/profile/buddyRequests
// @desc   Get the profiles of a user's buddy requests
// @access Private
router.get("/buddyRequests", auth, async (req, res) => {
  try {
    // Get the user's profile and check if it exists
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(401).json({ msg: "You did not make your profile yet" });
    }

    const profiles = await Profile.find({
      user: { $in: profile.requests },
    }).populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  GET api/profile/buddyProfiles
// @desc   Get the profiles of a user's buddy buddies
// @access Private
router.get("/buddyProfiles", auth, async (req, res) => {
  try {
    // Get the user's profile and check if it exists
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(401).json({ msg: "You did not make your profile yet" });
    }

    const profiles = await Profile.find({
      user: { $in: profile.buddies },
    }).populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  GET api/profile/invites
// @desc   Get the groups that sent an invite
// @access Private
router.get("/invites", auth, async (req, res) => {
  try {
    /* Get user & profile and check if profile exists */
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res
        .status(404)
        .json({ msg: "Profile has not been created yet, make one" });
    }

    /* Get the groups that sent invites and return */
    const groups = await Group.find({ _id: { $in: profile.invites } });
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  PUT api/profile/invites/:group_id
// @desc   Join the group in an invite
// @access Private
router.put("/invites/:group_id", auth, async (req, res) => {
  try {
    /* get the profile and check if it exists */
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not created yet" });
    }

    /* get the group and check if it exists */
    const group = await Group.findById(req.params.group_id);
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    /* Make sure the user isn't already in the group */
    let joiningUser = group.members.filter(
      (member) => member.user.toString() === req.user.id.toString()
    );
    if (joiningUser.length > 0) {
      return res.status(401).json({ msg: "You are already in this group" });
    }

    /* Check if the invite actually exists */
    let inviteIndex = profile.invites
      .map((invite) => invite.toString())
      .indexOf(req.params.group_id);
    if (inviteIndex < 0) {
      return res
        .status(401)
        .json({ msg: "You were not sent an invite by this group" });
    }

    /* Check if the group has a set max_member count, and validate */
    if (group.max_members) {
      if (group.members.length === group.max_members) {
        return res
          .status(400)
          .json({ msg: "Group's max member count as been reached" });
      }
    }

    /* Because of my conditions in the endpoint, group requests
      don't need to be resolved, cause you can't send an invite
      if a member requested, as the two will cancel out and the user
      will auto join the group
      */

    /* Add member and return */
    profile.invites.splice(inviteIndex, 1);
    group.members.push({ user: req.user.id, host: false });
    await group.save();
    await profile.save();
    res.json({ msg: `You have been added to ${group.name}` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  DELETE api/profile/invites/:group_id
// @desc   Remove an invite
// @access Private
router.delete("/invites/:group_id", auth, async (req, res) => {
  try {
    /* Get the profile and check if it exists */
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res
        .status(404)
        .json({ msg: "You have not made your profile yet" });
    }

    /* Check if the invite exists */
    let inviteIndex = profile.invites
      .map((invite) => invite.toString())
      .indexOf(req.params.group_id);
    if (inviteIndex < 0) {
      return res
        .status(400)
        .json({ msg: "You did not recieve an invite from this group" });
    }

    /* Remove the invite and return */
    profile.invites.splice(inviteIndex, 1);
    await profile.save();
    res.json({ msg: "Invite successfully denied" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  POST api/profile/notifications/:profile_id
// @desc   Send a new notification
// @access Private
router.post(
  "/notifications/:profile_id",
  [auth, [check("message").not().isEmpty()]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const fromProfile = await Profile.findOne({ user: req.user.id });
      if (!fromProfile) {
        return res
          .status(404)
          .json({ msg: "You have not created a profile yet" });
      }

      const toProfile = await Profile.findOne({
        user: req.params.profile_id,
      }).populate("user", ["name"]);
      if (!toProfile) {
        return res
          .status(404)
          .json({ msg: "The profile you're sending to does not exist" });
      }

      const { message, group, user, event } = req.body;
      const notificationFields = {};

      if (message) notificationFields.message = message;
      if (group) notificationFields.group = group;
      if (event) notificationFields.event = event;
      if (user) notificationFields.user = user;

      toProfile.notifications.push(notificationFields);
      await toProfile.save();
      res.json({
        msg: `Notification successfully sent to ${toProfile.user.name}`,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route  GET api/profile/notifications
// @desc   Get all notifications
// @access Private
router.get("/notifications", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res
        .status(404)
        .json({ msg: "You have not created your profile yet" });
    }
    console.log(profile);
    res.json(profile.notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  DELETE api/profile/notifications/:id
// @desc   Remove a notification
// @access Private
router.delete("/notifications/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ msg: "Profile does not exist yet" });
    }

    let removeIndex = profile.notifications
      .map((notification) => notification._id.toString())
      .indexOf(req.params.id);
    if (removeIndex < 0) {
      return res.status(400).json({ msg: "Notification does not exist" });
    }

    profile.notifications.splice(removeIndex, 1);
    await profile.save();
    res.json({ msg: "Notification successfully removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
