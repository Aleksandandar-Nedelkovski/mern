const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  filePath: {
    type: String,
  },
});

module.exports = mongoose.model("video", VideoSchema);
