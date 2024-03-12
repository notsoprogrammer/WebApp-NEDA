import {Add, FileUpload, FilterAlt, GridView, TableView} from '@mui/icons-material';
import { Avatar, Box, Button, ButtonGroup, Chip, TextField, Typography } from '@mui/material'

import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { farmerData } from '../util/data';

const columns = [
  {
    field: 'avatar',
    headerName: ' ',
    width: 70,
    renderCell: (params) => (
      <Avatar alt={`$(params.value)`} src=''/>
    )
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  }, 
  {
    field: 'barangay',
    headerName: 'Barangay',
    flex: 1,
  }, 
  {
    field: 'birthDate',
    headerName: 'Birth Date',
    flex: 1,
  }, 
  {
    field: 'annualGross',
    headerName: 'Annual Gross',
    flex: 1,
  }, 
  {
    field: 'farmersAssociation',
    headerName: 'Affiliation',
    flex: 1,
  }, 
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => (
     <Chip label={params.value} color={params.value === 'Active' ? 'success' : 'error'}/>
    )
  }, 
]

const Farmers = () => {
  return (
    <Box height="calc(100vh-64px)" width="calc(100%-250px)" sx={{mt: '100px', p: 5}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 4}}>
        <Box sx={{diplay:'block'}}>
          <Typography variant='h3'>Farmer's List</Typography>
          <Typography variant='span'>List of all farmers covered by the project from different municipalities in samar.</Typography>
        </Box>
        <TextField sx={{width: 250}} id="outlined-basic" label="Search" variant="outlined" />
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button><FilterAlt sx={{mr: 1}}/>Filter</Button>
      <Button><TableView sx={{mr: 1}}/> Table View</Button>
      <Button><GridView sx={{mr: 1}}/>Grid View</Button>
    </ButtonGroup>
    <Box sx={{display: 'flex', gap: 2}}>
      <Button variant='contained'><Add sx={{mr:1}}/>RSBSA Enrollment</Button>
      <Button  utton variant='contained'><FileUpload sx={{mr:1}}/>Export</Button>
    </Box>
      </Box>
      <Box sx={{mt: 2,height: '65vh'}}>
          <DataGrid rows={farmerData} columns={columns} />
      </Box>
    </Box>
  )
}

export default Farmers