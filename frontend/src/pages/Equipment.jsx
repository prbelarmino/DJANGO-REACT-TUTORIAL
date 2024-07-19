import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import EquipmentsHeader from "../components/EquipmentsHeader";

import {EquipmentColumns} from "../headers/ListHeaders"
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import api from "../api";


function Equipment() {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [equipments, setEquipments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      getEquipments();
  }, []);

  const getEquipments = () => {
      api
          .get("/api/equipments/list/")
          .then((res) => res.data)
          .then((data) => {
              const sortedData = data.sort((b, a) => a.id - b.id); // Sort by ID
              setEquipments(sortedData);
          })
          .catch((err) => alert(err));
  };

  const onDelete = (event, params) => {
      api
          .delete(`/api/equipments/delete/${params.id}/`)
          .then((res) => {
              if (res.status === 204) alert("Equipment deleted!");
              else alert("Failed to delete Equipment.");
              getEquipments();
          })
          .catch((error) => alert(error));
  };
  const onViewMore = (event,params) => {

    navigate(`/equipments/${params.id}`)
  };
  const onEdit = (event,params) => {

    navigate(`/equipments/update/${params.id}`)
  };
  
  return (
    <Box m="20px">
      <EquipmentsHeader getEquipments={getEquipments}/>
      
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
            rows={equipments} 
            columns={EquipmentColumns(onEdit, onDelete, onViewMore)} 
            slots={{
              toolbar: GridToolbar,
            }}
            hideFooterSelectedRowCount
            rowHeight={30}
            //sx={{ padding: "0px" }}
        />
      </Box>
    </Box>
  );
};

export default Equipment;