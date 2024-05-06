import React, { useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';


const { tableau } = window;

const Farmers = () => {
  const tableauVizRef = useRef(null);
      useEffect(() => {
        let viz;
        const initViz = () => {
          // Replace with your Tableau dashboard URL
          const vizUrl = 'https://prod-apsoutheast-a.online.tableau.com/t/geomapsamar/views/CropStatistics_V3/VegFarmersList';
          
          const options = {
            width: '100%',
            height: '100%',
            hideTabs: true,
            hideToolbar: true,
            onFirstInteractive: () => {
              console.log('Tableau dashboard is interactive');
            },
          };
          
          viz = new tableau.Viz(tableauVizRef.current, vizUrl, options);
        };
        
        initViz();
    
        // Event listener for window resize
        const handleResize = () => {
          if (viz) {
            viz.setFrameSize(undefined, tableauVizRef.current.clientHeight);
          }
        };
    
        window.addEventListener('resize', handleResize);
    
        // Cleanup function to prevent memory leaks
        return () => {
          window.removeEventListener('resize', handleResize);
          if (viz) {
            // Dispose of the current visualization to prevent memory leaks
            viz.dispose();
          }
        };
      }, []);
      
      // // Inline styles for responsive design
      // const responsiveStyle = {
      //   height: '100vh', // Adjust this value as needed
      //   width: '100%',
      //   padding: '10px',
      //   backgroundSize: 'cover', // Adjust as per your background image requirements
      //   backgroundRepeat: 'no-repeat',
      //   backgroundPosition: 'center',
      // };
    
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

export default Farmers;
