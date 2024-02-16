const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: {
      type: String,
      unique: true,
      required: true,
      maxlength: 10,
      minlength: 10,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
      message: "Gender must be either male or female",
    },
    email: { type: String, unique: true, required: true },
    fairPoints: { type: Number, default: 1000 },
    appreciations: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user_info", userSchema);

module.exports = { userModel };
