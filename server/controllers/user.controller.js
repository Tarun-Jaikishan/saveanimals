const { adoptModel } = require("../models/adoptModel");
const { lostModel } = require("../models/lostModel");
const { postModel } = require("../models/postModel");
const { userModel } = require("../models/userModel");

// Adoption

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

// DELETE -> api/user/adopt?id=value
const removeAdopt = async (req, res) => {
  try {
    const { username } = req.user;
    const { id } = req.query;

    const response = await adoptModel.deleteOne({ _id: id, username });
    if (response.deletedCount === 1)
      return res.status(200).json({ message: "Adoption Removed Successfully" });
    else return res.status(400).json({ error: "Invalid Adoption ID" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET -> api/user/adopt
const getUserAdopts = async (req, res) => {
  try {
    const { username } = req.user;
    let response = await adoptModel
      .find({ username }, { updatedAt: 0, __v: 0 })
      .lean();

    response = response.map((item, i) => {
      return {
        ...item,
        misleading: item.misleading.length,
      };
    });

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT -> api/user/adopt
const adoptMislead = async (req, res) => {
  try {
    const { username } = req.user;
    const { id } = req.body;

    const check = await adoptModel.findOne({ _id: id }).lean();

    if (!check) return res.status(400).json({ error: "Invalid Adoption ID" });

    if (username === check.username)
      return res
        .status(200)
        .json({ message: "Mislead Cannot Be Set By Yourself" });

    if (check.misleading.includes(username))
      return res.status(200).json({ message: "Updated Misleading Adoption" });

    await adoptModel.updateOne(
      { _id: id },
      {
        $set: {
          misleading: [...check.misleading, username],
        },
      }
    );

    return res.status(200).json({ message: "Updated Misleading Adoption" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Open For All Users
// GET -> api/user/adopt-all?state=value&city=value
const getAdopt = async (req, res) => {
  try {
    const { state = null, city = null } = req.query;
    let query = {};
    if (state) query = { "location.state": state };
    if (city) query = { ...query, "location.city": city };

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
        $match: {
          ...query,
        },
      },
    ]);

    response = response.map((item, i) => {
      return {
        ...item,
        misleading: item.misleading.length,
      };
    });

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Lost Animals

// GET -> api/user/lost
const raiseLost = async (req, res) => {
  try {
    const { username } = req.user;
    let data = req.body;
    data.username = username;

    const checkAdoptions = await lostModel.find({ username }).countDocuments();
    if (checkAdoptions >= 3)
      return res
        .status(400)
        .json({ error: "Only Three Active Lost Requests Allowed" });

    const response = await lostModel.create(data);

    if (response)
      return res
        .status(200)
        .json({ message: "Lost Request Raised Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE -> api/user/lost?id=value
const removeLost = async (req, res) => {
  try {
    const { username } = req.user;
    const { id } = req.query;

    const response = await lostModel.deleteOne({ _id: id, username });
    if (response.deletedCount === 1)
      return res
        .status(200)
        .json({ message: "Lost Request Removed Successfully" });
    else return res.status(400).json({ error: "Invalid Lost Request ID" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET -> api/user/lost
const getUserLost = async (req, res) => {
  try {
    const { username } = req.user;
    let response = await lostModel
      .find({ username }, { updatedAt: 0, __v: 0 })
      .lean();

    response = response.map((item, i) => {
      return {
        ...item,
        misleading: item.misleading.length,
      };
    });

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT -> api/user/lost
const lostMislead = async (req, res) => {
  try {
    const { username } = req.user;
    const { id } = req.body;

    const check = await lostModel.findOne({ _id: id }).lean();

    if (!check)
      return res.status(400).json({ error: "Invalid Lost Request ID" });

    if (username === check.username)
      return res
        .status(400)
        .json({ error: "Mislead Cannot Be Set By Yourself" });

    if (check.misleading.includes(username))
      return res
        .status(200)
        .json({ message: "Updated Misleading Lost Request" });

    await lostModel.updateOne(
      { _id: id },
      {
        $set: {
          misleading: [...check.misleading, username],
        },
      }
    );

    return res.status(200).json({ message: "Updated Misleading Adoption" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Open For All Users
// GET -> api/user/lost-all?state=value&city=value
const getLost = async (req, res) => {
  try {
    const { state = null, city = null } = req.query;
    let query = {};
    if (state) query = { "location.state": state };
    if (city) query = { ...query, "location.city": city };

    let response = await lostModel.aggregate([
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
        $match: {
          ...query,
        },
      },
    ]);

    response = response.map((item, i) => {
      return {
        ...item,
        misleading: item.misleading.length,
      };
    });

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Posts

// POST -> api/user/posts
const raisePost = async (req, res) => {
  try {
    const { username } = req.user;
    let data = req.body;
    data.username = username;

    const response = await postModel.create(data);

    if (response)
      return res.status(200).json({ message: "Post Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE -> api/user/posts?id=value
const removePost = async (req, res) => {
  try {
    const { username } = req.user;
    const { id } = req.query;

    const response = await postModel.deleteOne({ _id: id, username });
    if (response.deletedCount === 1)
      return res.status(200).json({ message: "Post Removed Successfully" });
    else return res.status(400).json({ error: "Invalid Post ID" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET -> api/user/posts
const getUserPost = async (req, res) => {
  try {
    const { username } = req.user;
    let response = await postModel
      .find({ username }, { updatedAt: 0, __v: 0 })
      .lean();

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

// PUT -> api/user/posts/mislead
const postMislead = async (req, res) => {
  try {
    const { username } = req.user;
    const { id } = req.body;

    const check = await postModel.findOne({ _id: id }).lean();

    if (!check) return res.status(400).json({ error: "Invalid Post ID" });

    if (username === check.username)
      return res
        .status(400)
        .json({ message: "Mislead Cannot Be Set By Yourself" });

    if (check.likes.includes(username))
      return res
        .status(400)
        .json({ message: "Post Already Been Marked As Liked" });

    if (check.misleading.includes(username))
      return res.status(200).json({ message: "Updated Misleading Post" });

    await postModel.updateOne(
      { _id: id },
      {
        $set: {
          misleading: [...check.misleading, username],
        },
      }
    );

    return res.status(200).json({ message: "Updated Misleading Post" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT -> api/user/posts/like
const postLike = async (req, res) => {
  try {
    const { username } = req.user;
    const { id } = req.body;

    const check = await postModel.findOne({ _id: id }).lean();

    if (!check) return res.status(400).json({ error: "Invalid Post ID" });

    if (username === check.username)
      return res
        .status(400)
        .json({ message: "Like Cannot Be Set By Yourself" });

    if (check.misleading.includes(username))
      return res
        .status(400)
        .json({ message: "Post Already Been Marked As Misleading" });

    if (check.likes.includes(username))
      return res.status(200).json({ message: "Post Liked" });

    await postModel.updateOne(
      { _id: id },
      {
        $set: {
          likes: [...check.likes, username],
        },
      }
    );

    // Appreciation
    const userInfo = await userModel.findOne({ username: check.username });

    await userModel.updateOne(
      { username: check.username },
      {
        $set: {
          appreciations: userInfo.appreciations + 1,
        },
      }
    );

    return res.status(200).json({ message: "Post Liked" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Open For All Users
// GET -> api/user/posts-all?state=value&city=value
const getPost = async (req, res) => {
  try {
    const { state = null, city = null } = req.query;
    let query = {};
    if (state) query = { "location.state": state };
    if (city) query = { ...query, "location.city": city };

    let response = await postModel.aggregate([
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
        $match: {
          ...query,
        },
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

module.exports = {
  raiseAdopt,
  getAdopt,
  removeAdopt,
  adoptMislead,
  getUserAdopts,
  raiseLost,
  removeLost,
  lostMislead,
  getUserLost,
  getLost,
  raisePost,
  removePost,
  getUserPost,
  postMislead,
  postLike,
  getPost,
};
