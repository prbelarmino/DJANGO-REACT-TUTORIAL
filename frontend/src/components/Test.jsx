import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Sample Data
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null }
];

// Define columns
const columns = [
  { field: 'id', headerName: 'ID', width: 90,headerClassName: 'super-app-theme--header',
  },
  { field: 'firstName', headerName: 'First name', width: 150,headerClassName: 'super-app-theme--header',
  },
  { field: 'lastName', headerName: 'Last name', width: 150,headerClassName: 'super-app-theme--header',
  },
  { field: 'age', headerName: 'Age', type: 'number', width: 110,headerClassName: 'super-app-theme--header',
  }
];

// Custom styled DataGrid
const CustomDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .super-app-theme--header': {
     backgroundColor: 'red',
 },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#f44336', // Background color for the column headers
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    color: '#ffffff', // Text color for the column headers
    fontWeight: 'bold', // Font weight for the column headers
  },
  '& .MuiDataGrid-cell': {
    borderColor: '#e0e0e0', // Border color for the cells
  },
  '& .MuiDataGrid-row': {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f9f9f9', // Background color for odd rows
    },
  },
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: '#e0e0e0', // Background color for the footer
  },
  '& .MuiDataGrid-overlay': {
    backgroundColor: 'transparent', // Background color for overlays
  },
}));

const Test = () => {
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h6" component="div" gutterBottom>
        DataGrid with Custom Header and Footer Color
      </Typography>
      <Paper elevation={3} sx={{ height: 500, width: '100%' }}>
        <CustomDataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Paper>
    </Box>
  );
};

export default Test;
