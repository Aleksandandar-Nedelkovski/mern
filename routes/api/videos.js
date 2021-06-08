const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const { Video } = require("../../models/Video");

// @route    GET api/videos
// @desc     Get all videos
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const videos = await Video.find().sort({ date: -1 });
    if (videos.length === 0) {
      return res.status(404).send("No videos created");
    }
    res.json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/uploadVideo", (req, res) => {
  const video = new Video(req.body);

  video.save((err, video) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/getVideo", (req, res) => {
  Video.findOne({ _id: req.body.videoId })
    .populate("writer")
    .exec((err, video) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, video });
    });
});

module.exports = router;
