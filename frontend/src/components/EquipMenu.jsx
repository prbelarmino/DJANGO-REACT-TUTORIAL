import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate, createSearchParams } from 'react-router-dom';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Delete as DeleteIcon } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';
import api from "../api";

function EquipMenu({id_equipment}) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorActions, setAnchorActions] = useState(null);
  const [anchorDocuments, setAnchorDocuments] = useState(null);
  const navigate = useNavigate();

  const onDelete = () => {
    api
        .delete(`/api/equipments/delete/${id_equipment}/`)
        .then((res) => {
            if (res.status === 204){
              alert("Equipment deleted!");
              navigate("/equipments/");
            } 
            else alert("Failed to delete Equipment.");
        })
        .catch((error) => alert(error));
  };
  const onEdit = () => {
    navigate(`/equipments/update/${id_equipment}`)
  };
  const handleCloseActions = () => {
    setAnchorActions(null);
  };
  const handleClickActions = (event) => {
    setAnchorActions(event.currentTarget);
  };

  const handleEditAction = () => {
    handleCloseActions();
    onEdit();
  };
  const handleDeleteAction = () => {
    handleCloseActions();
    onDelete();
  };
  const handleClickDocuments = (event) => {
    setAnchorDocuments(event.currentTarget);
  };

  const handleCloseDocuments = () => {
    setAnchorDocuments(null);
  };
  const createCalib = () => {
    const equip_id = id_equipment;
    handleCloseDocuments();
    navigate(`/equipments/create-calibration/${equip_id}`);
  };
  const createOrder = (e) => {
    const equip_id = id_equipment;
    e.preventDefault();
    handleCloseDocuments();
    navigate(`/equipments/create-order/${equip_id}`);
  };
  return (
    <Box  
      m= "5px 25px 25px 25px" 
      display="flex"
      alignItems="center"

    > 
      <Box mr= "20px">     
        <Button
          variant="contained"
          color="secondary"
          endIcon={<ArrowDropDownIcon />}
          onClick={handleClickActions}
        >
          Ações
        </Button>
        <Menu
          anchorEl={anchorActions}
          open={Boolean(anchorActions)}
          onClose={handleCloseActions}
        >
          <MenuItem onClick={handleDeleteAction}>
            <DeleteIcon sx={{mr: "10px"}} />
            Excluir Equipamneto
          </MenuItem>
          <MenuItem onClick={handleEditAction}>
            <EditIcon sx={{mr: "10px"}} />
            Editar Equipamento
          </MenuItem>
        </Menu>
      </Box>
      <Box mr= "20px">     
        <Button
          variant="contained"
          color="secondary"
          endIcon={<ArrowDropDownIcon />}
          onClick={handleClickDocuments}
        >
          Documentos
        </Button>
        <Menu
          anchorEl={anchorDocuments}
          open={Boolean(anchorDocuments)}
          onClose={handleCloseDocuments}
        >
          <MenuItem onClick={createCalib}>
            <AddIcon sx={{mr: "10px"}} />
            Criar Calibração
          </MenuItem>
          <MenuItem onClick={createOrder}>
            <AddIcon sx={{mr: "10px"}} />
            Criar Ordem de Serviço
          </MenuItem>
        </Menu>
      </Box>
      <Button
          variant="contained"
          color="secondary"
          //size="small"
          disabled={true}
          sx={{ m: "0 15px 0 0", 
            textTransform: "None", 
            //p: "3px 10px 3px 10px",
            minWidth: "120px"}}
      >
        <PrintIcon sx={{ m: "0 5px 0 0"}}/>
        Imprimir
      </Button>
    </Box>
  );
};

export default EquipMenu;