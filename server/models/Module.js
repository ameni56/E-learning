const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, unique: true },
  },
  { timestamps: true } // Add the timestamps option here
);

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
