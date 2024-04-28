import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";

function CustomList({ rows, columns, height}) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const handleCellClick = (params, event) => {
  //   event.stopPropagation();
  //   console.log("Cell clicked:", params);
  // };
  // const handleRowClick = (params, event) => {
  //   event.stopPropagation();
  //   //console.log("Row clicked:", params);
  // };
  return (

    <Box
        m="0 0 100px 0"
        height={height}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
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
            slots={{
              toolbar: GridToolbar,
            }}
            //rowHeight={100}
            //onCellClick={handleCellClick}
            //onRowClick={handleRowClick}
        />
    </Box>

  );
};

export default CustomList;