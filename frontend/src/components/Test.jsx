import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Visibility as VisibilityIcon, Delete as DeleteIcon } from '@mui/icons-material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'columnName', headerName: 'Column Name', width: 150 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <div>
        <IconButton onClick={() => onViewMore(params.row)}>
          <VisibilityIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(params.row)}>
          <DeleteIcon />
        </IconButton>
      </div>
    ),
  },
];

const MyDataGrid = ({ data, onViewMore, onDelete }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
      />
    </div>
  );
};

export default MyDataGrid;
