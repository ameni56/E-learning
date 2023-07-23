const express = require("express");
const { getFormations, createFormation,getAgents,
    updateFormation,
    deleteFormation,
    getFormationById , getFormateurs} = require("../controllers/client");
const router = express.Router();
//formation
router.get("/formations", getFormations);
router.post("/formations/add", createFormation);
router.get("/formations/:id", getFormationById);
router.put("/formations/:id", updateFormation);
router.delete("/formations/:id", deleteFormation);
//Agents
router.get("/agents",getAgents)
//Formateurs
router.get("/formateurs",getFormateurs)

module.exports = router;
