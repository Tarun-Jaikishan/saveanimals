const mongoose = require("mongoose");

const vertnarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  education: { type: String, required: true },
});

const clinicSchema = new mongoose.Schema(
  {
    clinic: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    timings: { type: String, required: true },
    services: { type: [String] },
    staffs: { type: [vertnarySchema] },
  },
  { timestamps: true }
);

const clinicModel = mongoose.model("clinic", clinicSchema);

module.exports = { clinicModel };
