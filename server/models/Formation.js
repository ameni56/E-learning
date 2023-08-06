const mongoose = require('mongoose');

// Schema for the "formations" collection
const formationSchema = new mongoose.Schema({
  
  description: {
    type: String,
   
  },
  
  duree: {
    type: Number,
    required: true
  },
  objectifs: {
    type: [String],
    required: true
  },
  // statut: {
  //   type: String,
  //   enum: ['en_attente', 'validee'],
  //   default: 'en_attente'
  // },
  lienMeet: {
    type: String
  },
  cours: {
    type: String
  },
  // Utilisation de "ref" pour établir une relation avec le modèle Module
  modules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  }],
  populationCible: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Population'
  }],
   // Reference to the User model for the formateur
   nomFormateur: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],

  dateDebut: {
    type: Date
  },
  dateFin: {
    type: Date
  },
 
  // rating: {
  //   type: Number
  // },
  formateurAccepte: {
    type: Boolean,
    default: null
  },
  agents: [
    {
      agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent'
      },
      accepte: {
        type: Boolean,
        default: false
      }
    }
  ]
},
{ timestamps: true }
// Other attributes specific to the formation
);

// Model for the "formations" collection
const Formation = mongoose.model('Formation', formationSchema);

module.exports = Formation;
