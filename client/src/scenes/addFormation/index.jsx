import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import {
  useGetPopulationsQuery,
  useCreateFormationMutation,
  useGetFormationsQuery,
  useGetModulesQuery,
  useGetFormateursQuery,
} from "../../state/api";
import { useNavigate } from "react-router-dom";

const AddFormation = () => {
  const navigate = useNavigate();
  const [formationData, setFormationData] = useState({
    description: "",
    duree: 0,
    objectifs: [],
    lienMeet: "",
    cours: [],
    modules: [],
    populationCible: [],
    nomFormateur: [],
    dateDebut: "",
    dateFin: "",
    formateurAccepte: false,
    agents: [],
  });

  const [modules, setModules] = useState([]);
  const { data: modulesData, isLoading: isLoadingModules } = useGetModulesQuery();

  useEffect(() => {
    if (modulesData) {
      setModules(modulesData);
    }
  }, [modulesData]);

  const [populations, setPopulations] = useState([]);
  const { data: populationsData, isLoading: isLoadingPopulations } = useGetPopulationsQuery();

  useEffect(() => {
    if (populationsData) {
      setPopulations(populationsData);
    }
  }, [populationsData]);

  const [createFormation] = useCreateFormationMutation();
  const { refetch: refreshFormations } = useGetFormationsQuery();
  const [formateurs, setFormateurs] = useState([]);
  const { data: formateursData, isLoading: isLoadingFormateurs } = useGetFormateursQuery();

  useEffect(() => {
    if (formateursData) {
      setFormateurs(formateursData);
    }
  }, [formateursData]);

  const handleAddModule = (module) => {
    setFormationData({
      ...formationData,
      modules: [...formationData.modules, module],
    });
  };

  const handleRemoveModule = (module) => {
    setFormationData({
      ...formationData,
      modules: formationData.modules.filter((m) => m !== module),
    });
  };

  const handleAddPopulation = (population) => {
    setFormationData({
      ...formationData,
      populationCible: [...formationData.populationCible, population],
    });
  };

  const handleRemovePopulation = (population) => {
    setFormationData({
      ...formationData,
      populationCible: formationData.populationCible.filter((p) => p !== population),
    });
  };

  const handleAddFormateur = (formateur) => {
    setFormationData({
      ...formationData,
      nomFormateur: [...formationData.nomFormateur, formateur],
    });
  };

  const handleRemoveFormateur = (formateur) => {
    setFormationData({
      ...formationData,
      nomFormateur: formationData.nomFormateur.filter((n) => n !== formateur),
    });
  };

  const handleChange = (e) => {
    setFormationData({
      ...formationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uniqueModules = [...new Set(formationData.modules)];
      const uniquePopulationCible = [...new Set(formationData.populationCible)];
      const uniqueFormateurs = [...new Set(formationData.nomFormateur)];

      await createFormation({
        ...formationData,
        modules: uniqueModules,
        populationCible: uniquePopulationCible,
        nomFormateur: uniqueFormateurs,
      });
      await refreshFormations();
      navigate("/formations");
    } catch (error) {
      console.log("Error", error);
    }
  };
  console.log("formateursData", formateursData);
  console.log("formationData.nomFormateur", formationData.nomFormateur);
  return (
    <Box m="1.5rem 2.5rem">
      <h1>Ajouter une formation</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          name="objectifs"
          label="Objectifs"
          value={formationData.objectifs}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name="duree"
          label="Durée"
          type="number"
          value={formationData.duree}
          onChange={handleChange}
          fullWidth
          required
        />
        <InputLabel>Module</InputLabel>
        <Select
          name="modules"
          onChange={(e) => handleAddModule(e.target.value)}
          fullWidth
          required
        >
          {isLoadingModules ? (
            <MenuItem value="">Loading...</MenuItem>
          ) : (
            modules
              .filter((module) => !formationData.modules.includes(module._id))
              .map((module) => (
                <MenuItem key={module._id} value={module._id}>
                  {module.nom}
                </MenuItem>
              ))
          )}
        </Select>
        <Box>
          {formationData.modules.map((module) => (
            <Chip
              key={module}
              label={modules.find((m) => m._id === module)?.nom || "Unknown Module"}
              onDelete={() => handleRemoveModule(module)}
              style={{ margin: "0.5rem 0.5rem 0 0" }}
            />
          ))}
        </Box>
        <InputLabel>Population Cible</InputLabel>
        <Select
          name="populationCible"
          onChange={(e) => handleAddPopulation(e.target.value)}
          fullWidth
          required
        >
          {isLoadingPopulations ? (
            <MenuItem value="">Loading...</MenuItem>
          ) : (
            populations
              .filter((population) => !formationData.populationCible.includes(population._id))
              .map((population) => (
                <MenuItem key={population._id} value={population._id}>
                  {population.nom}
                </MenuItem>
              ))
          )}
        </Select>
        <Box>
          {formationData.populationCible.map((population) => (
            <Chip
              key={population}
              label={
                populations.find((p) => p._id === population)?.nom || "Unknown Population"
              }
              onDelete={() => handleRemovePopulation(population)}
              style={{ margin: "0.5rem 0.5rem 0 0" }}
            />
          ))}
        </Box>
        <InputLabel>Nom Formateur</InputLabel>
        <Select
          name="nomFormateur"
         
          
          onChange={(e) => handleAddFormateur(e.target.value)}
          fullWidth
          required
        >
          {isLoadingFormateurs ? (
            <MenuItem value="">Loading...</MenuItem>
          ) : (
            formateurs
            
            .filter((formateur) => !formationData.nomFormateur.includes(formateur._id))
             .map((formateur) => (
              <MenuItem key={formateur._id} value={formateur._id}>
                {formateur.email}
              </MenuItem>
            ))
          )}
        </Select>
        <Box>
          {formationData.nomFormateur.map((formateur) => (
            <Chip
              key={formateur}
              label={
                formateurs.find((n) => n._id === formateur)?.email|| "Unknown formateur"
              }
              onDelete={() => handleRemoveFormateur((formateur))}
              style={{ margin: "0.5rem 0.5rem 0 0" }}
            />
          ))}
        </Box>
        <TextField
          name="dateDebut"
          label="Date Debut"
          type="datetime-local"
          value={formationData.dateDebut}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name="dateFin"
          label="dateFin"
          type="datetime-local"
          value={formationData.dateFin}
          onChange={handleChange}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Ajouter
        </Button>
      </form>
    </Box>
  );
};

export default AddFormation;
