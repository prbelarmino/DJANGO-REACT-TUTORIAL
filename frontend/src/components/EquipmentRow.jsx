import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "./Header";
import {EquipmentColumnsReduced} from "../headers/ListHeaders"


function EquipmentRow({ rows}) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Equipamento" subtitle="Informações Basica" />
      <Box
        m="0 0 100px 0 "
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
        }}
      >
      <DataGrid 
        rows={rows} 
        columns={EquipmentColumnsReduced} 
        autoHeight
            //rowHeight={52} // Adjust row height as needed
            //onCellClick={handleCellClick}
            //onRowClick={handleRowClick}
      />
      </Box>
    </Box>
  );
};

export default EquipmentRow;