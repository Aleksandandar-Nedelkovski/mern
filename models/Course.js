const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: String,
  content: String,
  resource_url: String,
});
const lesson = mongoose.model("lesson", lessonSchema);
const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  instructor: { type: mongoose.Schema.ObjectId, ref: "User" },
  published: {
    type: Boolean,
    default: false,
  },
  lessons: [lessonSchema],
});

module.exports = Course = mongoose.model("course", courseSchema);
