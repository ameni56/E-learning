import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Header from "../../components/Header";
import { useGetFormationsQuery, useUpdateFormationMutation, useDeleteFormationMutation } from "../../state/api";

const Formation = ({
  _id,
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
  stat,
  onDelete,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  // Mutation hooks
  const [updateFormation] = useUpdateFormationMutation();
  const [deleteFormation] = useDeleteFormationMutation();

  const handleEdit = () => {
    const updatedFormation = {
      // Update the properties you want to modify
      titre: "Updated Title",
      description: "Updated Description",
      rating: 5,
    };

    updateFormation({ id: _id, formation: updatedFormation });
  };

  const handleDelete = async () => {
    await deleteFormation(_id);
    onDelete(_id); // Notify the parent component that a formation has been deleted
  };

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {modules}
        </Typography>
        <Typography variant="h5" component="div">
          {titre}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color="primary"
          aria-label="Edit Formation"
          onClick={handleEdit}
        >
          <Edit />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="Delete Formation"
          onClick={handleDelete}
        >
          <Delete />
        </IconButton>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.secondary[400],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Formations = () => {
  const { data, isLoading, refetch } = useGetFormationsQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const [formationsData, setFormationsData] = useState([]); // Initialize the state with an empty array

  useEffect(() => {
    if (!isLoading) {
      setFormationsData(data || []); // Update the state variable when data changes or set it to an empty array if data is undefined
    }
  }, [data, isLoading]);

  const handleDeleteFormation = (formationId) => {
    // Filter out the deleted formation from the data array
    const updatedData = formationsData.filter((formation) => formation._id !== formationId);
    // Update the state variable
    setFormationsData(updatedData);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header subtitle="Voir toutes les formations." />
      {formationsData.length > 0 || !isLoading ? ( // Add a check to ensure formationsData is not empty
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
            <Formation key={formation._id} {...formation} onDelete={handleDeleteFormation} />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Formations;
