const { clinicModel } = require("../models/clinicModel");
const { userModel } = require("../models/userModel");

// GET -> api/public/clinic-info
const getClinicInfo = async (req, res) => {
  try {
    const response = await clinicModel.find();
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET -> api/public/user-info
const getUserInfo = async (req, res) => {
  try {
    const { username } = req.query;
    const response = await userModel.find(
      { username, fairPoints: { $gt: 500 } },
      { _id: 0, __v: 0, updatedAt: 0 }
    );
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getClinicInfo, getUserInfo };
