import { Box, Paper, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";

function CustomList({ title, rows, columns, height, width = '80hw'}) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Paper elevation={3} 
          sx={{  
            width: width,
            backgroundColor: colors.greenAccent[600] , 
            mb: '50px',
            }}
    >
      <Typography 
      sx={{
          
          fontSize: 16,
          fontWeight: 'bold',
          
          borderRadius: '4px', // Applying rounded corners
          //marginLeft: '0px',
          padding: '5px', // Adding padding for better visual appearance
          //color: theme.palette.background.default
      }}
          gutterBottom
      > 
          {title}
      </Typography>
      <Box
        height={height}
        sx={{
          '& .super-app-theme--header': {
            backgroundColor: theme.palette.primary.shadow,
          },
          "& .MuiDataGrid-root": {
            backgroundColor: theme.palette.primary.shadow,
            border: "none",
            
          },
          "& .MuiDataGrid-cell": {
            backgroundColor: theme.palette.background.default,
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.primary[400],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
            
          },
        }}
      >
        <DataGrid 
            rows={rows} 
            columns={columns}
            columnHeaderHeight={20}
            hideFooterSelectedRowCount
            rowHeight={30}
            headerHeight={30}
            slots={{
              toolbar: GridToolbar,
            }}
            //rowHeight={100}
            //onCellClick={handleCellClick}
            //onRowClick={handleRowClick}
        />
      </Box>

    </Paper>
    

  );
};

export default CustomList;