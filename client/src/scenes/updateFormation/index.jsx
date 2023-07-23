import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Select, MenuItem, Chip, InputLabel } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetFormationQuery,
  useUpdateFormationMutation,
  useGetFormationsQuery,
  useGetModulesQuery,
  useGetPopulationsQuery,
  useGetFormateursQuery, // Import the useGetFormateursQuery hook
} from "../../state/api";

const EditFormation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updatedFormation, setUpdatedFormation] = useState(null);
  const { data: formation, isLoading } = useGetFormationsQuery(id);
  const { refetch: refreshFormations } = useGetFormationsQuery();
  const { data: modulesData, isLoading: isLoadingModules } = useGetModulesQuery();
  const { data: populationCiblesData, isLoading: isLoadingPopulationCibles } = useGetPopulationsQuery();

   // Include the formateursData and isLoadingFormateurs variables
   const { data: formateursData, isLoading: isLoadingFormateurs } = useGetFormateursQuery();

  // Destructure the updateFormation function from the useUpdateFormationMutation hook
  const [updateFormation] = useUpdateFormationMutation();

  useEffect(() => {
    if (formation && formation.length > 0) {
      setUpdatedFormation(formation[0]);
    }
  }, [formation]);

  // Reset the state when the component unmounts
  useEffect(() => {
    return () => {
      setUpdatedFormation(null);
    };
  }, []);

  const handleAddModule = (moduleId) => {
    setUpdatedFormation({
      ...updatedFormation,
      modules: [...updatedFormation.modules, moduleId],
    });
  };

  const handleRemoveModule = (moduleId) => {
    setUpdatedFormation({
      ...updatedFormation,
      modules: updatedFormation.modules.filter((m) => m !== moduleId),
    });
  };

  const handleAddPopulation = (populationId) => {
    setUpdatedFormation({
      ...updatedFormation,
      populationCible: [...updatedFormation.populationCible, populationId],
    });
  };

  const handleRemovePopulation = (populationId) => {
    setUpdatedFormation({
      ...updatedFormation,
      populationCible: updatedFormation.populationCible.filter((p) => p !== populationId),
    });
  };
// Add the following code for handling formateur selection
const handleAddFormateur = (formateurId) => {
  setUpdatedFormation({
    ...updatedFormation,
    nomFormateur: [...updatedFormation.nomFormateur, formateurId],
  });
};

const handleRemoveFormateur = (formateurId) => {
  setUpdatedFormation({
    ...updatedFormation,
    nomFormateur: updatedFormation.nomFormateur.filter((n) => n!== formateurId),
  });
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFormation({
      ...updatedFormation,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Remove duplicates from selected modules and population cibles
      const uniqueModules = [...new Set(updatedFormation.modules)];
      const uniquePopulationCible = [...new Set(updatedFormation.populationCible)];
      const uniqueFormateurs = [...new Set(updatedFormation.nomFormateur)];
      await updateFormation({ id: id, formation: { ...updatedFormation, modules: uniqueModules, populationCible: uniquePopulationCible,
      nomFormateur:uniqueFormateurs } });
      await refreshFormations();
      navigate("/formations");
      window.location.reload(); // Force page refresh
    } catch (error) {
      console.log("Error", error);
    }
  };

  if (isLoading || isLoadingModules || isLoadingPopulationCibles) {
    return <div>Loading...</div>;
  }

  const selectedModules = updatedFormation?.modules
    ? updatedFormation.modules.map((moduleId) => modulesData.find((module) => module._id === moduleId))
    : [];
//population
  const selectedPopulationCibles = updatedFormation?.populationCible
    ? updatedFormation.populationCible.map((populationId) => populationCiblesData.find((popCible) => popCible._id === populationId))
    : [];
    //formateur
    const selectedFormateurs = updatedFormation?.nomFormateur
    ? updatedFormation.nomFormateur.map((formateurId) => formateursData.find((formateur) => formateur._id === formateurId))
    : [];

  return (
    <Box maxWidth={800} mx="auto" mt={4} p={3} boxShadow={3} borderRadius={4}>
      <Typography variant="h4" align="center" mb={3}>
        Edit Formation
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="description"
          label="Description"
          value={updatedFormation?.description || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          variant="outlined"
          sx={{ width: 400 }}
        />
        <TextField
          name="objectifs"
          label="Objectifs"
          value={updatedFormation?.objectifs || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          variant="outlined"
          sx={{ width: 400 }}
        />

        {/* Chips for selected modules */}
        <InputLabel>Modules</InputLabel>
        {selectedModules.map((module) => (
          <Chip
            key={module._id}
            label={module.nom}
            onDelete={() => handleRemoveModule(module._id)}
            color="primary"
            sx={{ m: 0.5 }}
          />
        ))}

        {/* Select dropdown for modules */}
        <Select
          name="modules"
          value={""} // Provide a value to reset the select dropdown after selecting an option
          onChange={(e) => handleAddModule(e.target.value)}
          fullWidth
          sx={{ width: 400 }}
        >
          {modulesData
            .filter((module) => !updatedFormation?.modules.includes(module._id))
            .map((module) => (
              <MenuItem key={module._id} value={module._id}>
                {module.nom}
              </MenuItem>
            ))}
        </Select>

        {/* Chips for selected population cibles */}
        <InputLabel>Population Cible</InputLabel>
        {selectedPopulationCibles.map((popCible) => (
          <Chip
            key={popCible._id}
            label={popCible.nom}
            onDelete={() => handleRemovePopulation(popCible._id)}
            color="primary"
            sx={{ m: 0.5 }}
          />
        ))}

        {/* Select dropdown for population cible */}
        <Select
          name="populationCible"
          value={""} // Provide a value to reset the select dropdown after selecting an option
          onChange={(e) => handleAddPopulation(e.target.value)}
          fullWidth
          sx={{ width: 400 }}
        >
          {populationCiblesData
            .filter((popCible) => !updatedFormation?.populationCible.includes(popCible._id))
            .map((popCible) => (
              <MenuItem key={popCible._id} value={popCible._id}>
                {popCible.nom}
              </MenuItem>
            ))}
        </Select>
{/* Chips for selected formateurs */}
<InputLabel>Nom Formateur</InputLabel>
        {selectedFormateurs.map((formateur) => (
          <Chip
            key={formateur._id}
            label={formateur.email}
            onDelete={() => handleRemoveFormateur(formateur._id)}
            color="primary"
            sx={{ m: 0.5 }}
          />
        ))}

        {/* Select dropdown for formateurs */}
        <Select
          name="nomFormateur"
          value={""} // Provide a value to reset the select dropdown after selecting an option
          onChange={(e) => handleAddFormateur(e.target.value)}
          fullWidth
          sx={{ width: 400 }}
        >
          {formateursData
            .filter((formateur) => !updatedFormation?.nomFormateur.includes(formateur._id))
            .map((formateur) => (
              <MenuItem key={formateur._id} value={formateur._id}>
                {formateur.email}
              </MenuItem>
            ))}
        </Select>
        
        <Button variant="contained" type="submit" color="primary" fullWidth size="large">
          Update
        </Button>
      </form>
    </Box>
  );
};

export default EditFormation;
