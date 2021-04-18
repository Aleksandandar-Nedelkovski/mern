const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  status: {
    type: String,
  },
  child: {
    type: String,
  },

  bio: {
    type: String,
  },
  from: {
    type: Date,
  },
  to: {
    type: Date,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("profile", ProfileSchema);
