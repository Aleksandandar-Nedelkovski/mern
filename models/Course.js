const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
  title: String,
  content: String,
  resource_url: String,
});
module.exports = mongoose.model("lesson", LessonSchema);

const CourseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
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
    required: "Category is required",
  },

  instructor: { user: { type: Schema.Types.ObjectId } },
  published: {
    type: Boolean,
    default: false,
  },
  lessons: [LessonSchema],
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("course", CourseSchema);
