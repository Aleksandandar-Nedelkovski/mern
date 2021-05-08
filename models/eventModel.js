const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  userAvatar: {
    type: String,
  },
  userName: {
    type: String,
  },
  eventName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
  attendees: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      host: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = Event = mongoose.model("event", eventSchema);
