const express = require("express");
const router = express.Router();

const {
  getClinicInfo,
  getUserInfo,
} = require("../controllers/public.controller");

// ROUTE -> api/public

router.get("/clinic-info", getClinicInfo);

router.get("/user-info", getUserInfo);

module.exports = router;
