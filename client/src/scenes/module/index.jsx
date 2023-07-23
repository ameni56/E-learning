import React, { useState } from "react";
import { Box, useTheme, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useGetModulesQuery, useDeleteModuleMutation, useCreateModuleMutation } from "../../state/api"; // Import the necessary API hooks for Module
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Delete, Add } from "@mui/icons-material";

const Module = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetModulesQuery(); // Use the hook for fetching modules
  const [deleteModule] = useDeleteModuleMutation(); // Hook for deleting a module
  const [createModule] = useCreateModuleMutation(); // Hook for creating a new module
  const navigate = useNavigate(); // Access the navigate function

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newModuleName, setNewModuleName] = useState("");
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(null);

  // New state to store the search query
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id) => {
    setSelectedModuleId(id);
    setOpenDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteModule(selectedModuleId);
      setOpenDeleteConfirmation(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteConfirmation(false);
    setSelectedModuleId(null);
  };

  const handleAddModule = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewModuleName("");
  };

  const handleSaveModule = async () => {
    if (newModuleName) {
      await createModule({ nom: newModuleName });
      setOpenAddDialog(false);
      setNewModuleName("");
    }
  };

  const handleNewModuleNameChange = (event) => {
    setNewModuleName(event.target.value);
  };

  // Filter the data based on the search query
  const filteredData = data
    ? data.filter((module) => module.nom.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const columns = [
    {
      field: "nom",
      headerName: "Nom",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      valueGetter: (params) => new Date(params.row.createdAt).toLocaleString(),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      flex: 1,
      valueGetter: (params) => new Date(params.row.updatedAt).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        const id = params.row._id;
        return (
          <Box display="flex" justifyContent="center" alignItems="center">
            <IconButton
              component={Link}
              to={`/modules/${id}`} // Update the route for the module details page
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
      <Header title="MODULE" subtitle="List of modules" />
      <Box display="flex" alignItems="center" mb="1rem">
        <Button variant="contained" startIcon={<Add />} onClick={handleAddModule}>
          Add Module
        </Button>
        <TextField
          label="Search by Name"
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
        <DialogTitle>Add Module</DialogTitle>
        <DialogContent>
          <TextField
            label="Module Name"
            value={newModuleName}
            onChange={handleNewModuleNameChange}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveModule} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteConfirmation} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this module?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} sx={{ color: "red" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Module;
