// Import statements
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import css from './formations.module.css'; // Import
import { Edit, Delete, Add } from "@mui/icons-material";
import Header from "../../components/Header";
import { useGetModulesQuery, useUpdateFormationMutation, useDeleteFormationMutation, useGetFormationsQuery, useCreateFormationMutation, useGetPopulationsQuery, useGetFormateursQuery } from "../../state/api";
import { useNavigate } from "react-router-dom";

// Formation component
const Formation = ({
  _id,
  description,
  objectifs,
  lienMeet,
  cours,
  modules,
  populationCible,
  modulesData,
  populationCiblesData, // Add populationCiblesData as a prop
  nomFormateur,
  dateDebut,
  dateFin,
  formateurAccepte,
  agents,
  stat,
  nomFormateurData, // Add nomFormateurData as a prop
  onDelete
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const [updateFormation] = useUpdateFormationMutation();
  const [deleteFormation] = useDeleteFormationMutation();
  const [createFormation] = useCreateFormationMutation();

  const handleEdit = () => {
    navigate(`/formations/${_id}`);
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    await deleteFormation(_id);
    onDelete(_id);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">
          {modulesData && modulesData.length > 0 ? (
            modules
              .map((moduleId) =>
                modulesData.find((m) => m._id === moduleId)?.nom || "Unknown Module"
              )
              .join(", ")
          ) : (
            <span>Loading...</span>
          )}
        </Typography>
        <Typography variant="body2">
          {formateurAccepte === true && <span className={css.accepted}>Statut: Accepté</span>}
          {formateurAccepte === false && <span className={css.refused}>Statut: Refusé</span>}
          {formateurAccepte === null && <span className={css.pending}>Statut: En attente</span>}
        </Typography>


        {/* <Typography variant="body2">Nom Formateur: {nomFormateurData ? nomFormateurData.email: nomFormateur}</Typography> */}
        <Typography variant="body2">
        nomFormateurData:{" "}
          {nomFormateurData && nomFormateurData.length > 0 ? (
            nomFormateur
              .map((nomFormateurId) =>
              nomFormateurData.find((p) => p._id === nomFormateurId)?.email || "Unknown nomFormateur"
              )
              .join(", ")
          ) : (
            <span>Loading...</span>
          )}
        </Typography>


        <Typography variant="body2">
          Population cible:{" "}
          {populationCiblesData && populationCiblesData.length > 0 ? (
            populationCible
              .map((populationCibleId) =>
                populationCiblesData.find((p) => p._id === populationCibleId)?.nom || "Unknown Population Cible"
              )
              .join(", ")
          ) : (
            <span>Loading...</span>
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleShowDetails}>
          View Details
        </Button>
        <IconButton aria-label="Edit Formation" onClick={handleEdit}>
          <Edit />
        </IconButton>
        <IconButton
          aria-label="Delete Formation"
          onClick={handleDelete}
          sx={{ color: "red" }}
        >
          <Delete />
        </IconButton>
      </CardActions>
      <Dialog open={showDetails} onClose={handleCloseDetails}>
        <DialogTitle>Formation Details</DialogTitle>
        <DialogContent>
          <Typography>
            Module:{" "}
            {modulesData && modulesData.length > 0 ? (
              modules
                .map((moduleId) =>
                  modulesData.find((m) => m._id === moduleId)?.nom || "Unknown Module"
                )
                .join(", ")
            ) : (
              <span>Loading...</span>
            )}
          </Typography>
          <Typography>Objectif: {objectifs}</Typography>
          <Typography>
            Population cible:{" "}
            {populationCiblesData && populationCiblesData.length > 0 ? (
              populationCible
                .map((populationCibleId) =>
                  populationCiblesData.find((p) => p._id === populationCibleId)?.nom || "Unknown Population Cible"
                )
                .join(", ")
            ) : (
              <span>Loading...</span>
            )}
          </Typography>
          {/* <Typography>Nom du formateur: {nomFormateurData ? nomFormateurData.email : nomFormateur}</Typography> */}
          <Typography variant="body2">
        nomFormateurData:{" "}
          {nomFormateurData && nomFormateurData.length > 0 ? (
            nomFormateur
              .map((nomFormateurId) =>
              nomFormateurData.find((p) => p._id === nomFormateurId)?.email || "Unknown nomFormateur"
              )
              .join(", ")
          ) : (
            <span>Loading...</span>
          )}
        </Typography>
          <Typography>Date début: {dateDebut}</Typography>
          <Typography>Date fin: {dateFin}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showConfirmation} onClose={handleCancelDelete}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Voulez-vous vraiment supprimer cette formation ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" sx={{ color: "red" }}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

const Formations = () => {
  const { data, isLoading, refetch } = useGetFormationsQuery();
  const { data: modulesData, isLoading: isLoadingModules } = useGetModulesQuery();
  const { data: populationCiblesData, isLoading: isLoadingPopulationCibles } = useGetPopulationsQuery(); // Fetch populationCiblesData
  const { data: nomFormateurData, isLoading: isLoadingNomFormateurs } = useGetFormateursQuery(); // Fetch nomFormateurData
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const [formationsData, setFormationsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      setFormationsData(data || []);
    }
  }, [data, isLoading]);

  const handleDeleteFormation = async (formationId) => {
    const updatedData = formationsData.filter((formation) => formation._id !== formationId);
    setFormationsData(updatedData);

    // Call the refetch function to refresh the list after deletion
    await refetch();
  };

  const handleAddFormation = () => {
    navigate("/formations/add");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" alignItems="center" mb="1rem">
        <Button variant="contained" startIcon={<Add />} onClick={handleAddFormation}>
          Ajouter formation
        </Button>
      </Box>
      {formationsData.length > 0 || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {formationsData.map((formation) => (
            <Formation
              key={formation._id}
              {...formation}
              modulesData={modulesData}
              populationCiblesData={populationCiblesData}
              nomFormateurData={nomFormateurData} // Pass the nomFormateurData to the Formation component
              onDelete={handleDeleteFormation}
            />
          ))}
        </Box>
      ) : (
        <>En cours...</>
      )}
    </Box>
  );
};

export default Formations;
