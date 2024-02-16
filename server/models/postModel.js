const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    name: { type: String },
    animal: { type: String, required: true }, // Dog
    breed: { type: String }, // Lab
    photo_link: { type: String },
    location: { type: String, required: true },
    description: { type: String },

    // Add usernames
    likes: { type: [String] },

    // Add usernames
    misleading: { type: [String] },
  },
  { timestamps: true }
);

const postModel = mongoose.model("posts_info", postSchema);

module.exports = { postModel };
