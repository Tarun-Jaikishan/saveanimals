const mongoose = require("mongoose");

const lostSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    name: { type: String },
    animal: { type: String, required: true }, // Dog
    breed: { type: String }, // Lab
    photo_link: { type: String },
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    description: { type: String, required: true },
    otherDetails: { type: String },
    hasTag: { type: Boolean, default: false },

    // Add usernames
    misleading: { type: [String] },
  },
  { timestamps: true }
);

const lostModel = mongoose.model("lost_info", lostSchema);

module.exports = { lostModel };
