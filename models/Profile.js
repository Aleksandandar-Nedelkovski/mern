const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  bio: String,
  courses: [String],
  year: Number,
  last_online: Date,
  invites: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "group",
  },
  buddies: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
  },
  requests: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("profile", ProfileSchema);
