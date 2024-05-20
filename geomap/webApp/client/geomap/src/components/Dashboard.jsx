import React, { useState, useEffect, useRef } from 'react';
import WeatherWidget from './WeatherWidget';
import { Box } from '@mui/material';
const { tableau } = window;

const Dashboard = () => {
  const [coords, setCoords] = useState(null);
  const tableauAgriInfo = useRef(null);
  const tableauMapDashboard = useRef(null);

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

    const options = {
      hideTabs: true,
      hideToolbar: true,
      onFirstInteractive: () => {
        console.log('Tableau dashboard is interactive');
      },
    };

    new tableau.Viz(tableauAgriInfo.current, 'https://prod-apsoutheast-a.online.tableau.com/t/geomapsamar/views/CropStatistics_V10/MainDB', options);
    new tableau.Viz(tableauMapDashboard.current, 'https://prod-apsoutheast-a.online.tableau.com/t/geomapsamar/views/CropStatistics_V10/Weather', options);

    return () => {
      tableauAgriInfo.current?.dispose();
      tableauMapDashboard.current?.dispose();
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '99vh', overflowY: 'hidden', paddingTop:'5px',boxSizing: 'border-box' }}>
      <Box sx={{ width: '49.9%', padding: '0 5px', display: 'flex',flexDirection: 'column' }}>
        <Box>
          {coords && <WeatherWidget coords={coords} />}
        </Box>
        <Box sx={{ flex: 1, padding:'2px',overflowY: 'hidden'  }}>
          <div ref={tableauMapDashboard} style={{ width: '100%', height: '100%' }} />
        </Box>
      </Box>
      <Box sx={{ 
      width: '50%',
      height: '100%',
      overflowY: 'scroll',
    }}>
      <div ref={tableauAgriInfo} style={{ width: '100%', height: '210%' }} />
    </Box>
    </Box>
  );
};

export default Dashboard;
