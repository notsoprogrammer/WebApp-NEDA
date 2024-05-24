import React, { useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';


const { tableau } = window;

const RiceStat = () => {
  const tableauVizRef = useRef(null);

  useEffect(() => {
    const initViz = () => {
      const vizUrl = 'https://prod-apsoutheast-a.online.tableau.com/t/geomapsamar/views/Agri-RiceProgram/CatbRiceProg_Adjusted';
      
      const options = {
        hideTabs: true,
        hideToolbar: true,
        onFirstInteractive: () => {
          console.log('Tableau dashboard is interactive');
        },
      };
      
      new tableau.Viz(tableauVizRef.current, vizUrl, options);
    };
    
    initViz();
    

    return () => {
      if (tableauVizRef.current) {
        tableauVizRef.current.dispose();
      }
    };
  }, []);
  
  return (

    <Box
  height="100vh"
  width="100%"
  sx={{
    backgroundColor: 'transparent',
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
  }}
>
  <div 
    ref={tableauVizRef}
    style={{
      height: '100vh', 
      width: '100%',
      margin: '0 auto',
      backgroundColor: 'transparent', 
    }}
  />
</Box>

  );
};

export default RiceStat;
