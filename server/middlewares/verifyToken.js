const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const verify = jwt.verify(token, process.env.JWT_KEY);

    if (verify) {
      req.user = verify;
      return next();
    }

    return res.status(403).json({ error: "API Service Forbidden" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error", err });
  }
};

module.exports = { verifyToken };
