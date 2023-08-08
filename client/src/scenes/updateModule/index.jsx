import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useGetModuleByIdQuery, useUpdateModuleMutation, useGetModulesQuery } from "../../state/api";

const EditModule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updatedModule, setUpdatedModule] = useState(null);
  const { data: module, isLoading } = useGetModuleByIdQuery(id);
  const { refetch: refreshModules } = useGetModulesQuery();
  const [updateModule] = useUpdateModuleMutation();

  useEffect(() => {
    if (module) {
      setUpdatedModule(module);
    }
  }, [module]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedModule((prevModule) => ({
      ...prevModule,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateModule({ id, module: updatedModule });
    await refreshModules();
    navigate("/modules");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box maxWidth={800} mx="auto" mt={4} p={3} boxShadow={3} borderRadius={4}>
      <Typography variant="h4" align="center" mb={3}>
        Modifier module
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="nom"
          label="Nom"
          value={updatedModule?.nom || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{ width: 400 }}
        />
        <Button variant="contained" type="submit" color="primary" fullWidth size="large">
          Modifier
        </Button>
      </form>
    </Box>
  );
};

export default EditModule;
