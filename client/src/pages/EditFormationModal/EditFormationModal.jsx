import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
} from '@mui/material';
import { useUpdateFormationMutation } from '../../state/api';

const EditFormationModal = ({ formation, open, onClose, refreshFormations }) => {
  const [updatedFormation, setUpdatedFormation] = useState(formation);
  const [updateFormation] = useUpdateFormationMutation();

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
      await updateFormation({
        id: updatedFormation._id,
        formation: updatedFormation,
      });
      await refreshFormations();
      onClose();
      window.location.reload(); // Reload the page after successful update
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        maxWidth={800}
        mx="auto"
        mt={4}
        p={3}
        boxShadow={3}
        borderRadius={4}
        bgcolor="white"
        style={{ outline: 'none' }}
      >
        <Typography variant="h4" align="center" mb={3}>
          Modifier la formation
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="description"
            label="Description"
            value={updatedFormation.description || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            variant="outlined"
          />
          <TextField
            name="lienMeet"
            label="Lien Meet"
            value={updatedFormation.lienMeet || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          {/* <TextField
            name="cours"
            label="Cours"
            value={updatedFormation.cours || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          /> */}
          <Button variant="contained" type="submit" color="primary" fullWidth size="large">
          Modifier
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditFormationModal;
