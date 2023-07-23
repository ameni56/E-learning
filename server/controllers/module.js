const Module = require("../models/Module");

// Get all modules
const getModules = async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a specific module by ID
const getModuleById = async (req, res) => {
  const { id } = req.params;
  try {
    const module = await Module.findById(id);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.json(module);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new module
const createModule = async (req, res) => {
  const { nom } = req.body;
  try {
    const newModule = new Module({ nom });
    const savedModule = await newModule.save();
    res.status(201).json(savedModule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a module
const updateModule = async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  try {
    const module = await Module.findByIdAndUpdate(
      id,
      { nom },
      { new: true }
    );
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.json(module);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a module
const deleteModule = async (req, res) => {
  const { id } = req.params;
  try {
    const module = await Module.findByIdAndDelete(id);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.json({ message: "Module deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
};
