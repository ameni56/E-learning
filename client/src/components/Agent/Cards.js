// src/components/Agent/Cards.js
import React, { useEffect, useState } from 'react';
import './Cards.css';
import { useGetFormationsByUserEmailPopulationQuery, useGetPopulationsQuery, useGetModulesQuery } from '../../state/api';
import MaterialReactTable from 'material-react-table';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function CardItem({ formation, modulesData }) {
  // Use modulesData to access modules information
  const modules = formation.modules.map((moduleId) => {
    const module = modulesData?.find((m) => m._id === moduleId);
    return module ? module.nom : 'Unknown Module';
  }).join(', ');

  // Format the date using toLocaleDateString
  const formattedDateDebut = new Date(formation.dateDebut).toLocaleDateString();
  const formattedDateFin = new Date(formation.dateFin).toLocaleDateString();

  return (
    <div className="card">
      <h3 className="module-name">{modules}</h3>
      <p className="description-text">{formation.description}</p>
      <p className="date-label">Date début: <span>{formattedDateDebut}</span></p>
      <p className="date-label">Date Fin: <span>{formattedDateFin}</span></p>
      <a href={formation.lienMeet}>Lien Meet</a>
    </div>
  );
}

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
  const filteredData = apiData.filter((formation) => formation.formateurAccepte === true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
  };

  return (
    <div>
      {isFormationsLoading || isPopulationsLoading || isModulesLoading ? (
        <p>Loading formations...</p>
      ) : formationsError || populationsError || modulesError ? (
        <p>Error fetching data: {formationsError?.message || populationsError?.message || modulesError?.message}</p>
      ) : (
        <div className="carousel-container">
          <Slider {...settings}>
            {filteredData.map((formation, index) => (
              <div key={index}>
                <CardItem formation={formation} modulesData={modulesData} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}

export default Cards;
