const mongoose = require("mongoose");

const adoptSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    age: { type: String, required: true }, // years-months-days
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
      message: "Gender must be either male or female",
    },
    animal: { type: String, required: true }, // Dog
    breed: { type: String }, // Lab
    photo_link: { type: String },
    description: { type: String, required: true },
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
    },

    isVaccinated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const adoptModel = mongoose.model("adoption", adoptSchema);

module.exports = { adoptModel };
