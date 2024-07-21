import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import EquipmentsHeader from "../components/EquipmentsHeader";
import CustomList from "../components/CustomList";
import {EquipmentColumns} from "../headers/ListHeaders"
import { useNavigate } from 'react-router-dom';
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
      <CustomList 
            title={"Equipamentos Cadastrados"}
            rows={equipments} 
            columns={EquipmentColumns(onEdit, onDelete, onViewMore)} 
            height={"65vh"}
            />
    </Box>
  );
};

export default Equipment;