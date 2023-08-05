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

// Create a new formation
const createFormation = async (req, res) => {
  try {
    const {
     
      description,
      duree,
      objectifs,
      // statut,
      lienMeet,
      cours,
      modules,
      populationCible,
      nomFormateur,
      dateDebut,
      dateFin,
      
      formateurAccepte,
      agents
    } = req.body;

    console.log("Received formation data:", req.body);
// Explicitly set the formateurAccepte field as null

    const newFormation = new Formation({
     
      description,
      duree,
      objectifs,
      // statut,
      lienMeet,
      cours,
      modules,
      populationCible,
      nomFormateur,
      dateDebut,
      dateFin,
      
      formateurAccepte:null,
      agents
    });

    console.log("New formation object:", newFormation);

    const savedFormation = await newFormation.save();

    console.log("Saved formation:", savedFormation);

    if (!savedFormation) {
      throw new Error("Failed to create formation");
    }

    res.status(201).json(savedFormation);
  } catch (error) {
    console.log("Error:", error);
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

//Formateurs
const getFormateurs=async(req,res)=>{
  try {
   const agents=await User.find({role:"formateur"}).select("-password");
    res.status(200).json(agents);
   } catch (error) {
     res.status(404).json({ message: error.message });
   }
 };


 const retrieveFormationByIdAndUserId = async (idFormation, idUser) => {
  try {
    // Use Mongoose or your chosen ORM to query the database for the formation
    // Based on the given idFormation and idUser (formateur ID)
    const formation = await Formation.findOne({
      _id: idFormation,
      idFormateur: idUser,
    });

    if (!formation) {
      // If the formation is not found, you can throw an error or return null or an empty object as per your requirement
      throw new Error('Formation not found');
      // return null;
      // return {};
    }

    // If the formation is found, you can return it as the result
    return formation;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    console.error('Error retrieving formation:', error);
    throw error;
  }
};

const getFormationsByUserEmail=async(req, res)=> {
  try {
    const userEmail = req.params.userEmail;
    // Fetch the User document using the userEmail
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      // User not found, return an empty array or an error message
      return res.json([]); // or res.status(404).json({ message: "User not found" });
    }

    // Fetch formations where nomFormateur matches the user's _id
    const formations = await Formation.find({ nomFormateur: user._id });
    res.json(formations);
  } catch (error) {
    console.error("Error fetching formations:", error);
    res.status(500).json({ message: "Error fetching formations" });
  }
}




// Controller to accept a formation
const acceptFormation = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) {
      return res.status(404).json({ message: 'Formation not found' });
    }

    formation.formateurAccepte = true; // Set the formateurAccepte status to true
    await formation.save();

    res.status(200).json({ message: 'Formation accepted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting formation', error });
  }
};

// Controller to refuse a formation
const refuseFormation = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) {
      return res.status(404).json({ message: 'Formation not found' });
    }

    formation.formateurAccepte = false; // Set the formateurAccepte status to false
    await formation.save();

    res.status(200).json({ message: 'Formation refused successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error refusing formation', error });
  }
};


    module.exports = {
      getFormations,
      createFormation,
      updateFormation,
  deleteFormation,
  getFormationById,
      getAgents,
      getFormateurs,
      getFormationsByUserEmail,
      acceptFormation,
      refuseFormation
    
    };
    
