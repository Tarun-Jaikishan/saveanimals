const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const {
  raiseAdopt,
  getAdopt,
  removeAdopt,
  getUserAdopts,
  raiseLost,
  getUserLost,
  removeLost,
  getLost,
  adoptMislead,
  lostMislead,
  raisePost,
} = require("../controllers/user.controller");

// ROUTE -> api/user
router.use(verifyToken);

// Adoption
router
  .route("/adopt")
  .post(raiseAdopt)
  .get(getUserAdopts)
  .delete(removeAdopt)
  .put(adoptMislead);

router.route("/adopt-all").get(getAdopt);

// Lost Request
router
  .route("/lost")
  .post(raiseLost)
  .get(getUserLost)
  .delete(removeLost)
  .put(lostMislead);

router.route("/lost-all").get(getLost);

// Posts
router.route("/posts").post(raisePost).get(getUserLost).delete(removeLost);

router.route("/posts-all").get(getLost);

module.exports = router;
