import React, { useState } from "react";
import { Box, useTheme, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useGetPopulationsQuery, useDeletePopulationMutation, useCreatePopulationMutation } from "../../state/api";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Delete, Add } from "@mui/icons-material";

const Population = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetPopulationsQuery();
  const [deletePopulation] = useDeletePopulationMutation();
  const [createPopulation] = useCreatePopulationMutation();
  const navigate = useNavigate(); // Access the navigate function

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newPopulation, setNewPopulation] = useState("");
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [selectedPopulationId, setSelectedPopulationId] = useState(null);

  // New state to store the search query
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id) => {
    setSelectedPopulationId(id);
    setOpenDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePopulation(selectedPopulationId);
      setOpenDeleteConfirmation(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteConfirmation(false);
    setSelectedPopulationId(null);
  };

  const handleAddPopulation = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewPopulation("");
  };

  const handleSavePopulation = async () => {
    if (newPopulation) {
      await createPopulation({ nom: newPopulation });
      setOpenAddDialog(false);
      setNewPopulation("");
    }
  };

  const handleNewPopulationChange = (event) => {
    setNewPopulation(event.target.value);
  };

  // Filter the data based on the search query
  const filteredData = data
    ? data.filter((population) => population.nom.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const columns = [
    {
      field: "nom",
      headerName: "Population",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Date de création",
      flex: 1,
      valueGetter: (params) => new Date(params.row.createdAt).toLocaleString(),
    },
    {
      field: "updatedAt",
      headerName: "Date de modification",
      flex: 1,
      valueGetter: (params) => new Date(params.row.updatedAt).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "Modifier/Supprimer",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        const id = params.row._id;
        return (
          <Box display="flex" justifyContent="center" alignItems="center">
            <IconButton
              component={Link}
              to={`/populations/${id}`}
              color="primary"
              size="small"
            >
              <Edit />
            </IconButton>
            <IconButton
              color="secondary"
              size="small"
              onClick={() => handleDelete(id)}
              sx={{ color: "red" }}
            >
              <Delete />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Population cible"  />
      <Box display="flex" alignItems="center" mb="1rem">
        <Button variant="contained" startIcon={<Add />} onClick={handleAddPopulation}>
          Ajouter population
        </Button>
        <TextField
          label="Rechercher"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          sx={{ ml: 2 }}
        />
      </Box>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.alt,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={filteredData} // Use the filtered data
          columns={columns}
        />
      </Box>

      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Ajouter population</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom population"
            value={newPopulation}
            onChange={handleNewPopulationChange}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSavePopulation} color="primary" variant="contained">
          Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteConfirmation} onClose={handleCancelDelete}>
        <DialogTitle>Confirmer suppression</DialogTitle>
        <DialogContent>
          Vous-voulez vraiment supprimer cette population ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDelete} sx={{ color: "red" }}>
          Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Population;
