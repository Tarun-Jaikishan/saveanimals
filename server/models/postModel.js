const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

const misLeadSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

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

    likes: { type: [likeSchema] },
    misleading: { type: [misLeadSchema] },
  },
  { timestamps: true }
);

const postModel = mongoose.model("posts_info", postSchema);

module.exports = { postModel };
