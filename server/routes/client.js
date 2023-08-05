const express = require("express");
const { getFormations, createFormation,getAgents,
    updateFormation,
    deleteFormation,
    getFormationById , getFormateurs,
sendFormationToFormateurById,
getFormationsFormateurs,
getFormationsByUserEmail,
acceptFormation,
refuseFormation} = require("../controllers/client");
const Formation = require("../models/Formation");
const { User } = require("../models/user");
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

router.get("/formation/:userEmail",getFormationsByUserEmail);

//formateurAccepte la formation ou non
// Route to accept a formation
router.put('/formations/:id/accept', acceptFormation);

// Route to refuse a formation
router.put('/formations/:id/refuse', refuseFormation);



module.exports = router;
