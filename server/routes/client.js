const express = require("express");
const { getFormations, createFormation,getAgents,
    updateFormation,
    deleteFormation,
    getFormationById } = require("../controllers/client");
const router = express.Router();
//formation
router.get("/formations", getFormations);
router.post("/formations", createFormation);
router.get("/formations/:id", getFormationById);
router.put("/formations/:id", updateFormation);
router.delete("/formations/:id", deleteFormation);
//Agents
router.get("/agents",getAgents)
module.exports = router;
