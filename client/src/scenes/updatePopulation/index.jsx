import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPopulationByIdQuery, useUpdatePopulationMutation } from "../../state/api";
import Header from "../../components/Header";

const EditPopulation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updatedPopulation, setUpdatedPopulation] = useState(null);
  const { data: population, isLoading } = useGetPopulationByIdQuery(id); // Use useGetPopulationByIdQuery instead of useGetPopulationsQuery
  const [updatePopulation] = useUpdatePopulationMutation();

  useEffect(() => {
    if (population) {
      setUpdatedPopulation(population); // Remove [0] as useGetPopulationByIdQuery already fetches a single population
    }
  }, [population]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPopulation((prevPopulation) => ({
      ...prevPopulation,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePopulation({ id: id, population: updatedPopulation });
    navigate("/populations");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box maxWidth={800} mx="auto" mt={4} p={3} boxShadow={3} borderRadius={4}>
      {/* <Header subtitle="Modifier population" /> */}
      <Typography variant="h4" align="center" mb={3}>
        Modifier population
      </Typography>
      <form onSubmit={handleSubmit}>
      <Box mt={2}>
        <TextField
          name="nom"
          label="Nom population"
          value={updatedPopulation?.nom || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          sx={{ width: 600,marginLeft:"-170px" }}
       
        />
        </Box>
        <Button variant="contained" type="submit" color="primary" fullWidth size="large">
        Modifier
        </Button>
      </form>
    </Box>
  );
};

export default EditPopulation;
