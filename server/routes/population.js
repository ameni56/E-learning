const express = require("express");
const {
  getPopulations,
  getPopulationById,
  createPopulation,
  updatePopulation,
  deletePopulation,
} = require("../controllers/population");

const router = express.Router();

router.get("/populations", getPopulations);
router.get("/populations/:id", getPopulationById);
router.post("/populations", createPopulation);
router.put("/populations/:id", updatePopulation);
router.delete("/populations/:id", deletePopulation);

module.exports = router;
