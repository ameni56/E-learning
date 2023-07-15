const Formation=require("../models/Formation");
const  FormationStat=require("../models/FormationStat");
const {User}=require("../models/user")

//Formation 
//getFormations
const getFormations=async(req,res)=>{
    try {
       const formations=await Formation.find();
       const formationsWithStats=await Promise.all(
        formations.map(async(formation)=>{
        const stat=await FormationStat.find({
            formationId:formation._id
        })
        return{
            ...formation._doc,
            stat,
        }
        })
       );
       res.status(200).json(formationsWithStats)
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    };

//Création d'une formation
const createFormation = async (req, res) => {
  try {
    const {
      titre,
      description,
      duree,
      objectifs,
      statut,
      lienMeet,
      cours,
      modules,
      populationCible,
      nomFormateur,
      dateDebut,
      dateFin,
      heureDebut,
      heureFin,
      rating,
    } = req.body;

    const newFormation = new Formation({
      titre,
      description,
      duree,
      objectifs,
      statut,
      lienMeet,
      cours,
      modules,
      populationCible,
      nomFormateur,
      dateDebut,
      dateFin,
      heureDebut,
      heureFin,
      rating,
    });

   
    const savedFormation = await newFormation.save();

    if (!savedFormation) {
      throw new Error("Failed to create formation");
    }

    res.status(201).json(savedFormation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Modifier formation
const updateFormation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFormation = req.body;

    const formation = await Formation.findByIdAndUpdate(id, updatedFormation, { new: true });

    if (!formation) {
      return res.status(404).json({ message: "Formation not found" });
    }

    res.status(200).json(formation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete formation
const deleteFormation = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Deleting formation with ID:", id);

    const formation = await Formation.findByIdAndDelete(id);

    if (!formation) {
      console.log("Formation not found");
      return res.status(404).json({ message: "Formation not found" });
    }

    console.log("Formation deleted:", formation);

    res.status(200).json({ message: "Formation deleted successfully" });
  } catch (error) {
    console.log("Error deleting formation:", error.message);
    res.status(400).json({ message: error.message });
  }
};

//getFormationById
const getFormationById = async (req, res) => {
  try {
    const { id } = req.params;

    const formation = await Formation.findById(id);

    if (!formation) {
      return res.status(404).json({ message: "Formation not found" });
    }

    res.status(200).json(formation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//Agents
const getAgents=async(req,res)=>{
  try {
   const agents=await User.find({role:"agent"}).select("-password");
    res.status(200).json(agents);
   } catch (error) {
     res.status(404).json({ message: error.message });
   }
 };



    module.exports = {
      getFormations,
      createFormation,
      updateFormation,
  deleteFormation,
  getFormationById,
      getAgents
    };
    
