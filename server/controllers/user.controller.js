const { adoptModel } = require("../models/adoptModel");

// POST -> api/user/adopt
const raiseAdopt = async (req, res) => {
  try {
    const { username } = req.user;
    let data = req.body;
    data.username = username;

    const checkAdoptions = await adoptModel.find({ username }).countDocuments();
    if (checkAdoptions >= 3)
      return res
        .status(400)
        .json({ error: "Only Three Active Adoptions Allowed" });

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
    const { state = null, city = null } = req.query;
    let query = {};
    if (state) query.location.state = state;
    if (city) query.location.city = city;

    console.log(query);

    let response = await adoptModel.aggregate([
      {
        $lookup: {
          from: "user_infos",
          localField: "username",
          foreignField: "username",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $project: {
          "userInfo._id": 0,
          "userInfo.__v": 0,
          "userInfo.updatedAt": 0,
          __v: 0,
          updatedAt: 0,
        },
      },
      {
        $match: {},
      },
    ]);

    response = response.map((item, i) => {
      return {
        ...item,
        likes: item.likes.length,
        misleading: item.misleading.length,
      };
    });

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { raiseAdopt, getAdopt };
