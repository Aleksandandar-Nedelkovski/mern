const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
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

  instructor: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      name: {
        type: String,
      },
    },
  ],
  lessons: [
    {
      lesson: {
        type: Schema.Types.ObjectId,
        ref: "lesson",
      },
      complete: Boolean,
    },
  ],
  enrollments: [
    {
      courseId: {
        type: mongoose.Schema.ObjectId,
        ref: "course",
      },
      studentId: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      lessonStatus: [
        {
          lesson: {
            type: Schema.Types.ObjectId,
            ref: "lesson",
          },
          complete: Boolean,
        },
      ],
      completed: Date,
      updated: Date,
      enrolled: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  published: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("course", CourseSchema);
