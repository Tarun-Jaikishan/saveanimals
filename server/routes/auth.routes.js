const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth.controller");

// ROUTE -> api/auth

router.post("/register", register);

router.post("/", login);

module.exports = router;
