import React, { useState, useEffect, useRef } from 'react';
import WeatherWidget from './WeatherWidget';
import { Box } from '@mui/material';

const { tableau } = window;

const Dashboard = () => {
  const [coords, setCoords] = useState(null);
  const tableauVizRef = useRef(null);

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
          latitude: 11.824043, // Default latitude
          longitude: 124.840340, // Default longitude
        });
      }
    );

    const vizUrl = 'https://prod-apsoutheast-a.online.tableau.com/t/geomapsamar/views/CropStatistics_V1/SummaryofFarmers';
    const options = {
      hideTabs: true,
      hideToolbar: true,
      onFirstInteractive: () => {
        console.log('Tableau dashboard is interactive');
      },
    };

    // Instantiate the Tableau Viz
    const viz = new tableau.Viz(tableauVizRef.current, vizUrl, options);

    // Clean up the Viz when the component unmounts
    return () => {
      viz.dispose();
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100vh', paddingLeft:'20px', paddingTop: '20px' }}>
      {/* Left panel for Weather Widget */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {coords && <WeatherWidget coords={coords} />}
      </Box>
      
      {/* Right panel for Tableau Summary */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <div ref={tableauVizRef} style={{ height: '100%', width: '100%' }} />
      </Box>
    </Box>
  );
};

export default Dashboard;
