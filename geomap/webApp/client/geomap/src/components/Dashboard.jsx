import React, { useState, useEffect, useRef } from 'react';
import WeatherWidget from './WeatherWidget';
import { Box } from '@mui/material';
const { tableau } = window;

const Dashboard = () => {
  const [coords, setCoords] = useState(null);
  const tableauSummaryVizRef = useRef(null);
  const tableauAgriDashboardVizRef = useRef(null);

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

    new tableau.Viz(tableauSummaryVizRef.current, 'https://prod-apsoutheast-a.online.tableau.com/t/geomapsamar/views/CropStatistics_V9/Dashboard9', options);
    new tableau.Viz(tableauAgriDashboardVizRef.current, 'https://prod-apsoutheast-a.online.tableau.com/t/geomapsamar/views/CropStatistics_V8/Demography', options);

    return () => {
      tableauSummaryVizRef.current?.dispose();
      tableauAgriDashboardVizRef.current?.dispose();
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '99vh', overflow: 'hidden', paddingTop:'5px',boxSizing: 'border-box' }}>
      <Box sx={{ width: '49%', padding: '0 10px', display: 'flex',flexDirection: 'column' }}>
        <Box>
          {coords && <WeatherWidget coords={coords} />}
        </Box>
        <Box sx={{ flex: 1, paddingTop: '10px',overflowY: 'hidden'  }}>
          <div ref={tableauAgriDashboardVizRef} style={{ width: '100%', height: '100%' }} />
        </Box>
      </Box>
      <Box sx={{ 
      width: '50%',
      height: '100%',
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '-ms-overflow-style': 'none', 
      'scrollbar-width': 'none'     
    }}>
      <div ref={tableauSummaryVizRef} style={{ width: '100%', height: '130%' }} />
    </Box>
    </Box>
  );
};

export default Dashboard;
