import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../components/Header";
import {EquipmentColumns} from "../headers/ListHeaders"
import { useNavigate } from 'react-router-dom';

function EquipmentList({ rows, onDelete, onViewMore}) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  // const handleCellClick = (params, event) => {
  //   event.stopPropagation();
  //   console.log("Cell clicked:", params);
  // };
  // const handleRowClick = (params, event) => {
  //   event.stopPropagation();
  //   //console.log("Row clicked:", params);
  // };

  return (
    <Box m="20px">
      <Header title="Equipamentos" subtitle="Lista de Equipamentos" />
      <Button
          variant="contained"
          color="secondary"
          onClick={() => {navigate("/add-equip");} }
      >
          Adicionar Equipamento
      </Button>
      <Box
        m="0 0 40px 0 "
        height="75vh"
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
            columns={EquipmentColumns(onDelete, onViewMore)} 
            slots={{
              toolbar: GridToolbar,
            }}
            //onCellClick={handleCellClick}
            //onRowClick={handleRowClick}
        />
      </Box>
    </Box>
  );
};

export default EquipmentList;