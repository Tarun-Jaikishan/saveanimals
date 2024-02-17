const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    animal: { type: String, required: true }, // Dog
    breed: { type: String }, // Lab
    photo_link: { type: String, required: true },
    location_mark: { type: String, required: true }, //lattitude-longitude ex:22.45-22.55
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    description: { type: String },
    type: {
      type: String,
      required: true,
      enum: ["contribute", "need_help"],
      message: "Type must be either contribute or need_help",
    },

    postRelation: { type: String }, // For Contribute Type If Someone Contributed For Need Help

    // Add usernames
    likes: { type: [String] },

    // Add usernames
    misleading: { type: [String] },
  },
  { timestamps: true }
);

const postModel = mongoose.model("posts_info", postSchema);

module.exports = { postModel };
