const Population = require("../models/Population");

// Get all populations
const getPopulations = async (req, res) => {
  try {
    const populations = await Population.find();
    res.json(populations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a specific population by ID
const getPopulationById = async (req, res) => {
  const { id } = req.params;
  try {
    const population = await Population.findById(id);
    if (!population) {
      return res.status(404).json({ message: "Population not found" });
    }
    res.json(population);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new population
const createPopulation = async (req, res) => {
  const { nom } = req.body;
  try {
    const newPopulation = new Population({ nom });
    const savedPopulation = await newPopulation.save();
    res.status(201).json(savedPopulation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a population
const updatePopulation = async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  try {
    const population = await Population.findByIdAndUpdate(
      id,
      { nom },
      { new: true }
    );
    if (!population) {
      return res.status(404).json({ message: "Population not found" });
    }
    res.json(population);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a population
const deletePopulation = async (req, res) => {
  const { id } = req.params;
  try {
    const population = await Population.findByIdAndDelete(id);
    if (!population) {
      return res.status(404).json({ message: "Population not found" });
    }
    res.json({ message: "Population deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPopulations,
  getPopulationById,
  createPopulation,
  updatePopulation,
  deletePopulation,
};
