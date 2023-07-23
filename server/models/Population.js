const mongoose = require("mongoose");

const populationSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, unique: true },
  },
  { timestamps: true } // Add the timestamps option here
);

const Population = mongoose.model("Population", populationSchema);

module.exports = Population;
