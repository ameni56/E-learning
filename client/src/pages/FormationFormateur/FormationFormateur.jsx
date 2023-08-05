import React, { useEffect, useState } from 'react';
import css from './FormationFormateur.module.css';
import { useGetFormationsByUserEmailQuery, useGetPopulationsQuery, useGetModulesQuery, useAcceptFormationMutation, useRefuseFormationMutation } from '../../state/api';
import { useLocation } from 'react-router-dom';
import MaterialReactTable from 'material-react-table';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Import the icons from the react-icons library

const FormationFormateur = ({ userEmail }) => {
  const [refresh, setRefresh] = useState(0); // State variable for force refreshing

  const [formations, setFormations] = useState([]);

  const { data: apiData = [], error: formationsError, isLoading: isFormationsLoading } = useGetFormationsByUserEmailQuery(userEmail);
  const { data: populationCiblesData, error: populationsError, isLoading: isPopulationsLoading } = useGetPopulationsQuery(); // Fetch population cible data
  const { data: modulesData, error: modulesError, isLoading: isModulesLoading } = useGetModulesQuery(); // Fetch modules data

  // Mutation hooks for accepting and refusing formations
  const [acceptFormation] = useAcceptFormationMutation();
  const [refuseFormation] = useRefuseFormationMutation();

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
      // Update local state to reflect the change immediately
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
      // Update local state to reflect the change immediately
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
      // If formateurAccepte is null, show the confirmation window for accept or refuse
      if (action === 'accept') {
        handleAcceptConfirmation(formation._id);
      } else if (action === 'refuse') {
        handleRefuseConfirmation(formation._id);
      }
    }
  };

  useEffect(() => {
    // Set the local state with the data fetched from the API
    setFormations(apiData);
    console.log('Current Route:', pathname);
  }, [apiData, pathname, refresh]); // Include the 'refresh' state variable in the dependency array

  // Create a columns array to define table columns
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
      accessorKey: 'datedebut',
      header: 'Date de début',
    },
    {
      accessorKey: 'datefin',
      header: 'Date de fin',
    },
    {
      accessorKey: 'actions',
      header: 'Actions', // Header for the Accept and Refuse buttons
    },
    // Add more columns as needed
  ];

  // Format the formations data to match the table columns
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
    datedebut: formation.dateDebut,
    datefin: formation.dateFin,
    actions: ( // Render the Accept and Refuse buttons
    <div className={css.button}>
    {formation.formateurAccepte === true && <div className={css.accepted}>Accepté</div>}
    {formation.formateurAccepte === false && <div className={css.refused}>Refusé</div>}
    {formation.formateurAccepte === null && (
      <>
        <button
  className={`${css.refuse}`}
  onClick={() => handleFormateurAction(formation, 'refuse')}
  disabled={formation.formateurAccepte !== null}
>
  Refuser
</button>
<button
  className={`${css.accept}`}
  onClick={() => handleFormateurAction(formation, 'accept')}
  disabled={formation.formateurAccepte !== null}
>
  Accepter
</button>
      </>
    )}
  </div>
    ),
  }));

  return (
    <div className={css.container}>
      {isFormationsLoading || isPopulationsLoading || isModulesLoading ? (
        <p>Loading formations...</p>
      ) : formationsError || populationsError || modulesError ? (
        <p>Error fetching data: {formationsError?.message || populationsError?.message || modulesError?.message}</p>
      ) : (
        <div className="table-container">
          <MaterialReactTable columns={columns} data={tableData} />
        </div>
      )}
    </div>
  );
};

export default FormationFormateur;
