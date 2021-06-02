const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  title: String,
  content: String,
  resource_url: String,
});

module.exports = mongoose.model("lesson", LessonSchema);
