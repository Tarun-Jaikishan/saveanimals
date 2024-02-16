const express = require("express");
const { getCities } = require("../controllers/helper.controller");
const router = express.Router();

// ROUTE -> api/helper

router.get("/get-cities", getCities);

module.exports = router;
