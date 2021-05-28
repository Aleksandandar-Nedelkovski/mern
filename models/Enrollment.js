const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.ObjectId, ref: "course" },
  updated: Date,
  enrolled: {
    type: Date,
    default: Date.now,
  },
  student: { type: mongoose.Schema.ObjectId, ref: "user" },
  lessonStatus: [
    {
      lesson: { type: mongoose.Schema.ObjectId, ref: "lesson" },
      complete: Boolean,
    },
  ],
  completed: Date,
});

module.exports = mongoose.model("enrollment", EnrollmentSchema);
