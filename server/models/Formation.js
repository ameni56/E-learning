const mongoose = require('mongoose');

// Schéma pour la collection "formations"
const formationSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duree: {
    type: String,
    required: true
  },
  objectifs: {
    type: [String],
    required: true
  },
  statut: {
    type: String,
    enum: ['en_attente', 'validee'],
    default: 'en_attente'
  },
  lienMeet: {
    type: String
  },
  cours: {
    type: [String]
  },
  modules: {
    type: [String]
  },
  populationCible: {
    type: String
  },
  nomFormateur: {
    type: String
  },
  dateDebut: {
    type: Date
  },
  dateFin: {
    type: Date
  },
  heureDebut: {
    type: String
  },
  heureFin: {
    type: String
  },
  rating:{
    type : Number
  },
},
  {timestamps:true}
  // Autres attributs spécifiques à la formation
);

// Modèle pour la collection "formations"
const Formation = mongoose.model('Formation', formationSchema);

module.exports = Formation;
