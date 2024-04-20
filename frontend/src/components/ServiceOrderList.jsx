import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "./Header";
import {ServiceOrderColumns} from "../headers/ListHeaders"

function ServiceOrderList({ rows, onDelete, onAdd }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Ordem de Serviços" subtitle="Lista de Ordem de Serviços" />
      <Button
          variant="contained"
          color="secondary"
          onClick={onAdd}
      >
          Criar Ordem de Serviço
      </Button>
      <Box
        m="0 0 100px 0 "
        height="60vh"
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
            columns={ServiceOrderColumns(onDelete)} 
            slots={{
              toolbar: GridToolbar,
            }}
        />
      </Box>
    </Box>
  );
};

export default ServiceOrderList;