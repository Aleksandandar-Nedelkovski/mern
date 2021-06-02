const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnrollmentSchema = new Schema({
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
});

module.exports = mongoose.model("enrollment", EnrollmentSchema);
