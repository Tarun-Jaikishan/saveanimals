const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { userModel } = require("../models/userModel");
const { authModel } = require("../models/authModel");

// POST -> api/auth/register
const register = async (req, res) => {
  try {
    const { username, name, address, phone, gender, email, password } =
      req.body;

    const response = await userModel.findOne({
      $or: [{ username }, { email }, { phone }],
    });

    if (phone.length !== 10)
      return res
        .status(400)
        .json({ error: "Phone Number Must Contain Ten Digits" });

    if (gender !== "male" && gender !== "female")
      return res
        .status(400)
        .json({ error: "Gender Must Be Either Male Or Female" });

    if (!email.includes("@") || !email.includes("."))
      return res.status(400).json({ error: "Invalid Mail ID" });

    if (!response) {
      await userModel.create({ username, name, address, phone, gender, email });
      await authModel.create({ username, password });
      return res.status(200).json({ message: "Account Created Successfully" });
    } else {
      if (response.email === email)
        return res.status(400).json({ error: `Email '${email}' Taken` });
      else if (response.username === username)
        return res.status(400).json({ error: `Username '${username}' Taken` });
      else if (response.phone === phone)
        return res.status(400).json({ error: `Phone Number '${phone}' Taken` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST -> api/auth
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const response = await authModel.findOne({ username });
    const fairCheck = await userModel.findOne({ username });
    let passwordMatch = null;

    if (response)
      passwordMatch = await bcrypt.compare(password, response.password);

    if (!response || !passwordMatch)
      return res.status(404).json({ error: "Invalid Credentials" });
    else if (fairCheck.fairPoints < 500)
      return res
        .status(404)
        .json({ error: "Account Suspended Due To Lower Fair Points" });
    else {
      await authModel.updateOne(
        { username },
        {
          $set: {
            lastLogin: Date.now(),
          },
        }
      );

      const token = jwt.sign({ username }, process.env.JWT_KEY);
      return res
        .status(200)
        .json({ message: "Login Successful", token: token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { register, login };
