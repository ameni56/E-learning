const mongoose = require('mongoose');

// Schéma pour la collection "formations"
const formationStatSchema = new mongoose.Schema({
    formationId:String,
    yearlyPublishedTotal:Number,
    yearlyTotalFormation:Number,
    year:Number,
    monthlyData:[
        {
            month:String,
            totalPublished:Number,
            totalFormation:Number,
        }
    ],
    dailyData:{
        date:String,
        totalPublished:Number,
        totalFormation:Number,
    }
},
{timestamps:true}
);

const FormationStat = mongoose.model('FormationStat', formationStatSchema);

module.exports = FormationStat;
