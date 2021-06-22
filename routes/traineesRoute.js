const express = require("express");

const {
  createTrainee,
  getAllTrainees,
  getSingleTrainee,
  updateTrainee,
  deleteTrainee,
} = require("../controllers/traineesController");

const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(createTrainee).get(getAllTrainees);
router
  .route("/:_id")
  .get(getSingleTrainee)
  .put(updateTrainee)
  .delete(deleteTrainee);

module.exports = router;
