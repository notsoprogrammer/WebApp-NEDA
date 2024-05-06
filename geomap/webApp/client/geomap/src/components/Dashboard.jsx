import React, { useState, useEffect, useRef } from 'react';
import WeatherWidget from './WeatherWidget';
import { Box, Typography, Paper } from '@mui/material';
import AgricultureInfoCard from './AgriCardInfo';
const { tableau } = window;

const Dashboard = () => {
  const [coords, setCoords] = useState(null);
  const tableauSummaryVizRef = useRef(null);
  const tableauFarmersListVizRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
        setCoords({
          latitude: 11.7888905913845, // Default latitude
          longitude: 124.879792127437, // Default longitude
        });
      }
    );

    // Options for both Tableau dashboards
    const options = {
      hideTabs: true,
      hideToolbar: true,
      onFirstInteractive: () => {
        console.log('Tableau dashboard is interactive');
      },
    };

  //   // Instantiate the Tableau Viz for the summary
    const summaryVizUrl = 'https://prod-apsoutheast-a.online.tableau.com/t/geomapsamar/views/CropStatistics_V1/Dashboard5';
    new tableau.Viz(tableauSummaryVizRef.current, summaryVizUrl, options);

    return () => {
      if (tableauSummaryVizRef.current) {
        tableauSummaryVizRef.current.dispose();
      }
      if (tableauFarmersListVizRef.current) {
        tableauFarmersListVizRef.current.dispose();
      }
    };
   }, []);

    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', overflow: 'hidden', padding: '12px', boxSizing: 'border-box' }}>

        <Box sx={{ width: '50%', paddingRight: '10px', display: 'flex', flexDirection: 'column' }}>
          <Box>
            {coords && <WeatherWidget coords={coords} />}
          </Box>
          <Box sx={{ width: '100%', overflowY: 'auto' }}>
            <AgricultureInfoCard />
          </Box>
        <Box sx={{overflowX:'hidden', marginTop: '20px', flex: '1'}}>
          <div ref={tableauFarmersListVizRef} style={{ width: '100%', height: '100%' }} />
        </Box>
      </Box>
      <Box sx={{ width: '50%'}}>
        <div ref={tableauSummaryVizRef} style={{ width: '100%', height: '100%' }} />
      </Box>
      
    </Box>
  );
};

export default Dashboard;