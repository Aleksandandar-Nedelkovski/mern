const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    no: {
      type: Number,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = Category = mongoose.model("category", CategorySchema);
