import React, { useEffect, useState } from 'react';
import css from './FormationFormateur.module.css';
import { Box, Typography, Modal } from '@mui/material';
import { useGetFormationsByUserEmailQuery, useGetPopulationsQuery, useGetModulesQuery, useAcceptFormationMutation, useRefuseFormationMutation, useUpdateFormationMutation, useGetFormateursQuery } from '../../state/api';
import { useLocation } from 'react-router-dom';
import MaterialReactTable from 'material-react-table';
import { FaCheck, FaTimes } from 'react-icons/fa';
import EditFormationModal from '../EditFormationModal/EditFormationModal';

const FormationFormateur = ({ userEmail }) => {
  const [refresh, setRefresh] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);

  const [formations, setFormations] = useState([]);

  const { data: apiData = [], error: formationsError, isLoading: isFormationsLoading } = useGetFormationsByUserEmailQuery(userEmail);
  const { data: populationCiblesData, error: populationsError, isLoading: isPopulationsLoading } = useGetPopulationsQuery();
  const { data: modulesData, error: modulesError, isLoading: isModulesLoading } = useGetModulesQuery();
  const { data: formateursData, error: formateursError, isLoading: isFormateursLoading } = useGetFormateursQuery();

  const [acceptFormation] = useAcceptFormationMutation();
  const [refuseFormation] = useRefuseFormationMutation();
  const [updateFormation] = useUpdateFormationMutation();

  const { pathname } = useLocation();

  const handleAcceptConfirmation = async (formationId) => {
    const shouldAccept = window.confirm('Voulez-vous accepter cette formation?');
    if (shouldAccept) {
      await handleAcceptFormation(formationId);
    }
  };

  const handleRefuseConfirmation = async (formationId) => {
    const shouldRefuse = window.confirm('Voulez-vous refuser cette formation?');
    if (shouldRefuse) {
      await handleRefuseFormation(formationId);
    }
  };

  const handleAcceptFormation = async (formationId) => {
    try {
      await acceptFormation(formationId);
      const updatedFormations = formations.map((formation) =>
        formation._id === formationId ? { ...formation, formateurAccepte: true } : formation
      );
      setFormations(updatedFormations);
    } catch (error) {
      console.error('Error accepting formation:', error);
    }
  };

  const handleRefuseFormation = async (formationId) => {
    try {
      await refuseFormation(formationId);
      const updatedFormations = formations.map((formation) =>
        formation._id === formationId ? { ...formation, formateurAccepte: false } : formation
      );
      setFormations(updatedFormations);
    } catch (error) {
      console.error('Error refusing formation:', error);
    }
  };

  const handleFormateurAction = (formation, action) => {
    if (formation.formateurAccepte === null) {
      if (action === 'accept') {
        handleAcceptConfirmation(formation._id);
      } else if (action === 'refuse') {
        handleRefuseConfirmation(formation._id);
      }
    }
  };

  const handleModifyFormation = (formation) => {
    // Allow modification only if the formation is accepted (formateurAccepte === true)
    if (formation.formateurAccepte === true) {
      setSelectedFormation(formation);
      setShowEditModal(true);
    } else {
      // Show a message or alert to inform the user that the formation must be accepted first
      alert('Vous pouvez modifier seulement si vous acceptez cette formation.');
    }
  };

  useEffect(() => {
    setFormations(apiData);
    console.log('Current Route:', pathname);
  }, [apiData, pathname, refresh]);

  const columns = [
    {
      accessorKey: 'modules',
      header: 'Modules',
    },
    {
      accessorKey: 'populationCible',
      header: 'Population Cible',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'lienMeet',
      header: 'Lien Meet',
    },
    {
      accessorKey: 'datedebut',
      header: 'Date de début',
    },
    {
      accessorKey: 'datefin',
      header: 'Date de fin',
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
    },
  ];

  const tableData = formations.map((formation) => ({
    modules: formation.modules.map((moduleId) => {
      const module = modulesData?.find((m) => m._id === moduleId);
      return module ? module.nom : 'Unknown Module';
    }).join(', '),
    populationCible: formation.populationCible.map((populationId) => {
      const population = populationCiblesData?.find((p) => p._id === populationId);
      return population ? population.nom : 'Unknown Population Cible';
    }).join(', '),
    description: formation.description,
    lienMeet: formation.lienMeet,
    datedebut: formation.dateDebut,
    datefin: formation.dateFin,
    actions: (
    <div className={css.button}>
        {formation.formateurAccepte === true && <div className={css.accepted}>Accepté</div>}
        {formation.formateurAccepte === false && <div className={css.refused}>Refusé</div>}
        {formation.formateurAccepte === null && (
          <>
            <button
              className={`${css.accept}`}
              onClick={() => handleFormateurAction(formation, 'accept')}
            >
              Accepter
            </button>
            <button
              className={`${css.refuse}`}
              onClick={() => handleFormateurAction(formation, 'refuse')}
            >
              Refuser
            </button>
          </>
        )}
       <button
          className={`${css.modify} ${formation.formateurAccepte === false ? css.modifydisabled : ''}`}
          onClick={() => handleModifyFormation(formation)}
          disabled={formation.formateurAccepte === false}
        >
          Modifier
        </button>
      </div>
    ),
  }));
  // Update the mapping function to handle empty description and lienMeet
tableData.forEach((data) => {
  if (!data.description) {
    data.description = 'Aucune description';
  }
  if (!data.lienMeet) {
    data.lienMeet = 'Aucun lien ';
  }
});

  return (
    <div className={css.container}>
      {isFormationsLoading || isPopulationsLoading || isModulesLoading || isFormateursLoading ? (
        <p>Loading formations...</p>
      ) : formationsError || populationsError || modulesError || formateursError ? (
        <p>Error fetching data: {formationsError?.message || populationsError?.message || modulesError?.message || formateursError?.message}</p>
      ) : (
        <div className="table-container">
          <MaterialReactTable columns={columns} data={tableData} />
          {showEditModal && selectedFormation && (
            <EditFormationModal
              formation={selectedFormation}
              open={showEditModal}
              onClose={() => setShowEditModal(false)}
              refreshFormations={() => setRefresh((prev) => prev + 1)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FormationFormateur;
