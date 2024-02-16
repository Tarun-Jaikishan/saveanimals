const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const { raiseAdopt, getAdopt } = require("../controllers/user.controller");

// ROUTE -> api/user
router.use(verifyToken);

router.route("/adopt").post(raiseAdopt).get(getAdopt);

module.exports = router;
