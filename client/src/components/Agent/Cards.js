import React, { useEffect, useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { useGetFormationsByUserEmailQuery, useGetPopulationsQuery, useGetModulesQuery, useAcceptFormationMutation, useRefuseFormationMutation } from '../../state/api';

import MaterialReactTable from 'material-react-table';
import { useLocation } from 'react-router-dom';

function Cards({ userEmail }) {

  const [refresh, setRefresh] = useState(0); // State variable for force refreshing

  const [formations, setFormations] = useState([]);


  const { data: apiData = [], error: formationsError, isLoading: isFormationsLoading } = useGetFormationsByUserEmailQuery(userEmail);
  const { data: populationCiblesData, error: populationsError, isLoading: isPopulationsLoading } = useGetPopulationsQuery(); // Fetch population cible data
  const { data: modulesData, error: modulesError, isLoading: isModulesLoading } = useGetModulesQuery(); // Fetch modules data

  
  const { pathname } = useLocation();
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
  }));

  return (
    <div >
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


export default Cards;
