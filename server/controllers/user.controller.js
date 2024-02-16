const { adoptModel } = require("../models/adoptModel");

// POST -> api/user/adopt
const raiseAdopt = async (req, res) => {
  try {
    const { username } = req.user;
    let data = req.body;
    data.username = username;

    const checkAdoptions = await adoptModel.find({ username }).countDocuments();
    if (checkAdoptions > 5)
      return res
        .status(400)
        .json({ error: "Only Five Active Adoptions Allowed" });

    const response = await adoptModel.create(data);

    if (response)
      return res.status(200).json({ message: "Adoption Raised Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET -> api/user/adopt
const getAdopt = async (req, res) => {
  try {
    const response = await adoptModel.aggregate([
      {
        $lookup: {
          from: "user_infos",
          localField: "username",
          foreignField: "username",
          as: "userInfo",
        },
      },
    ]);

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { raiseAdopt, getAdopt };
