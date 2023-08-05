import React, { useEffect, useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { useGetFormationsByUserEmailPopulationQuery, useGetPopulationsQuery, useGetModulesQuery } from '../../state/api';

import MaterialReactTable from 'material-react-table';
import { useLocation } from 'react-router-dom';

function Cards({ userEmail }) {
  const [refresh, setRefresh] = useState(0); // State variable for force refreshing

  const { data: apiData = [], error: formationsError, isLoading: isFormationsLoading } = useGetFormationsByUserEmailPopulationQuery({ userEmail });
  const { data: populationCiblesData, error: populationsError, isLoading: isPopulationsLoading } = useGetPopulationsQuery(); // Fetch population cible data
  const { data: modulesData, error: modulesError, isLoading: isModulesLoading } = useGetModulesQuery(); // Fetch modules data

  const { pathname } = useLocation();
  useEffect(() => {
    console.log('Current Route:', pathname);
    console.log('Population Cibles Data:', populationCiblesData);
    console.log('User Email:', userEmail);
  }, [pathname, populationCiblesData, userEmail]);

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

  // Format the filtered formations data to match the table columns
  const tableData = apiData.map((formation) => ({
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
    <div>
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
}

export default Cards;
