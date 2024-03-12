import { Avatar, AvatarGroup, Box, Button, Card, CardActions, CardContent, Chip, CircularProgress, Grid, IconButton, Paper, Typography } from '@mui/material'
import { EastOutlined, MoreHorizRounded } from '@mui/icons-material'
import { cropYields, dummy } from '../util/data'

import { DataGrid } from '@mui/x-data-grid'
import FlexBetween from './FlexBetween'
import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import { ResponsivePie } from '@nivo/pie'
import { styled } from '@mui/material/styles'

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.background.alt,
  ...theme.typography.h5,
  // textAlign: 'center',
  color: theme.palette.text.secondary[100],
  height: 230,
  // lineHeight: '60px',
}));

const Pie = ({data}) => (
  <ResponsivePie
  height={300}
  width={550}
  data={data}
  margin={{ top: 10, right: 80, bottom: 80, left: 80 }}
  innerRadius={0.5}
  padAngle={0.7}
  cornerRadius={3}
  activeOuterRadiusOffset={8}
  borderWidth={1}
  borderColor={{
      from: 'color',
      modifiers: [
          [
              'darker',
              0.2
          ]
      ]
  }}
  arcLinkLabelsSkipAngle={10}
  arcLinkLabelsTextColor="#fff"
  arcLinkLabelsThickness={2}
  arcLinkLabelsColor={{ from: 'color' }}
  arcLabelsSkipAngle={10}
  arcLabelsTextColor={{
      from: 'color',
      modifiers: [
          [
              'darker',
              2
          ]
      ]
  }}
  legends={[
      {
          anchor: 'right',
          direction: 'column',
          justify: false,
          translateX: 135,
          translateY: -50,
          itemsSpacing: 15,
          itemWidth: 120,
          itemHeight: 18,
          itemTextColor: '#fff',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 20,
          symbolShape: 'circle',
          effects: [
              {
                  on: 'hover',
                  style: {
                      itemTextColor: 'red'
                  }
              }
          ]
      }
  ]}
/>
)

const Line = ({data}) => (
  <ResponsiveLine
        data={data}
        margin={{ top: 60, right: 110, bottom: 55, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Crop',
            legendOffset: 36,
            legendPosition: 'middle',
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: 'white',
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
);

const columns = [
  {
    field: "name",
    headerName: "Name",
    flex:1,
  },
  {
    field: "barangay",
    headerName: "Barangay",
    flex:1,
  },
  {
    field: "birthDate",
    headerName: "Birth Date",
    flex:1,
  },
  {
    field: "annualGross",
    headerName: "Annual Gross",
    flex:1,
  },
];

const rows = [
  {
    id: 1,
    name: 'John Doe',
    birthDate: '1990-05-15',
    barangay: 'Canticum',
    annualGross: 60000,
  },
  {
    id: 2,
    name: 'Jane Smith',
    birthDate: '1985-08-22',
    barangay: 'Beri',
    annualGross: 80000,
  },
  {
    id: 3,
    name: 'Michael Johnson',
    birthDate: '1993-02-10',
    barangay: 'Hubasan',
    annualGross: 55000,
  },
  {
    id: 4,
    name: 'Emily Williams',
    birthDate: '1998-11-03',
    barangay: 'Lubang',
    annualGross: 70000,
  },
  {
    id: 5,
    name: 'William Brown',
    birthDate: '1982-07-18',
    barangay: 'Literon',
    annualGross: 90000,
  },
];

const Dashboard = () => {

  return (
    <Box height="calc(100vh-64px)" width="calc(100%-250px)" sx={{display: 'flex', mt: '100px', flexDirection:'row', columnGap: 5, justifyContent: 'center',  alignContent: 'center'}}>
    {/* // <Box height="calc(100vh-64px)" width="calc(100% - 64px)" sx={{flexGrow: 1}}> */}
    {/* //   <h3>
    //     Dashboard
    //   </h3>
    //   <CircularProgress/> */}
      <Box sx={{ display: 'grid',
      gridTemplateColumns:'repeat(3, 1fr)',
      gridTemplateRows: 'auto',
      gap: 3,
      width: '1300px',
      justifyContent: 'center',
      alignContent: 'center',
      gridTemplateAreas: `"farmarBox assocBox grBox grBox grBox"
      ". grBox grBox grBox"
      "recent recent recent recent recent
      "yield yield brgy brgy brgy brgy"`
      }}>

          <StyledCard sx={{ px: 2, gridArea: '1 / 1 / 2 / 2'}}>
            <CardContent>
              <Typography sx={{ fontSize: 22 }} gutterBottom>
                Farmers
              </Typography>
              <Typography sx={{ fontSize: '4em', mb: 1.5, color: (theme) => theme.palette.mode === 'dark' ? '#ffe3a3' : theme.palette.secondary.main }}>
                39
              </Typography>
              <AvatarGroup sx={{mr: 14}} max={4}>
                <Avatar alt="Remy Sharp" src="" />
                <Avatar alt="Travis Howard" src="" />
                <Avatar alt="Cindy Baker" src="" />
                <Avatar alt="Agnes Walker" src="" />
                <Avatar alt="Trevor Henderson" src="" />
              </AvatarGroup>
            </CardContent>
          </StyledCard> 

        <StyledCard sx={{ px: 2, gridArea:' 1 / 2 / 2 / 3' }}>
          <CardContent>
            <Typography sx={{ fontSize: 22 }} gutterBottom>
              Associations
            </Typography>
            <Typography sx={{ fontSize: '4em', mb: 1.5, color: (theme) => theme.palette.mode === 'dark' ? '#ffe3a3' : theme.palette.secondary.main }}>
              11
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
              <Typography>View all </Typography><EastOutlined sx={{ ml:2, fontSize: "2rem"}}/>
            </Box>
          </CardContent>
        </StyledCard> 

        <StyledCard sx={{width: '600px', height: '325px', gridArea:'1 / 3 / 3 / 5'}}>
            <h2 style={{ marginLeft: "1rem" }}>Gender Ratio of Farmers</h2>
            <Pie data={dummy}/>
        </StyledCard>


        <h2>Recently added Farmers</h2>
        <Box sx={{ height: '6em', gridArea: '3 / 1 / 4 / 5'}}>
          <Box sx={{display: 'flex', columnGap: 5, width: '1200px'}}>
            <Box sx={{p:2, display: 'flex', gap: 5, flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
             backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.alt : theme.palette.background.alt}}>
              <Avatar alt="Remy Sharp" src="" />
              <span>Jane Doe<br></br><span style={{color: '#909090'}}>February 29, 2023</span></span>
              <Chip label='Verified' color='success' sx={{color: "#fff", width: 95}} />
              <h4>Php 100,000</h4>
              <MoreHorizRounded sx={{fontSize: 55}}/>
            </Box>
            <Box sx={{p:2, display: 'flex', gap: 5, flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
             backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.alt : theme.palette.background.alt}}>
              <Avatar alt="Remy Sharp" src="" />
              <span>Jane Doe<br></br><span style={{color: '#909090'}}>February 29, 2023</span></span>
              <Chip label='Verified' color='success' sx={{color: "#fff", width: 95}} />
              <h4>Php 100,000</h4>
              <MoreHorizRounded sx={{fontSize: 55}}/>
            </Box>
          </Box>
        </Box>

        <StyledCard sx={{position: 'relative',height: '280px',gridArea: '4 / 1 / 6 / 3'}}>
          <Typography sx={{position: 'absolute', mt: 1, top: '0', left: '50%', transform: 'translateX(-50%)'}} variant='h4'>Top Yielding Crops</Typography>
            <Line  data={cropYields}/>
          <span>Top yielding Crops</span>
        </StyledCard>

        <StyledCard sx={{height: '280px', gridArea: '4 / 3 / 6 / 5'}}>
          <Box sx={{display: 'flex', flexDirection: 'row',justifyContent:'space-between', alignItems:'center'}}> 
            <Typography sx={{p:2}} variant='h3'>Farmers</Typography>
            <Typography sx={{p:2}} variant='h6'>View all</Typography>
          </Box>
            <Box height="auto">
              <DataGrid rows={rows} columns={columns} />
            </Box>    
        </StyledCard>
      </Box>
    </Box>
  )
}

export default Dashboard