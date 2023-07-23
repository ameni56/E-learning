const express = require("express");
const {
  getModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
} = require("../controllers/module");

const router = express.Router();

router.get("/modules", getModules);
router.get("/modules/:id", getModuleById);
router.post("/modules", createModule);
router.put("/modules/:id", updateModule);
router.delete("/modules/:id", deleteModule);

module.exports = router;
