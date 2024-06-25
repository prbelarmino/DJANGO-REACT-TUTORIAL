// import { Button, Link, IconButton } from "@material-ui/core";
// import { Visibility as VisibilityIcon, Delete as DeleteIcon } from "@material-ui/icons";
// import { createStyles, makeStyles } from "@material-ui/core/styles";

import { IconButton } from '@mui/material';
import { Visibility as VisibilityIcon, Delete as DeleteIcon } from "@mui/icons-material";
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'; 
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ExpandCellRenderer from './ExpandCells';

const multiLineWrap = (value) => {
  return <div className="multiLineWrap">{value}</div>;
};

export const EquipmentColumnsReduced = [

  { field: "id", headerName: "ID", align: "center", width: "50"},
  {
    field: "type",
    headerName: "Tipo",
    ////flex: 1,
    //cellClassName: "name-column--cell",
    headerAlign: "center",
    align: "center",
    width: "200",
  },
  {
    field: "state",
    headerName: "Estado",
    type: "string",
    headerAlign: "center",
    align: "center",
    
  },
  {
    field: "owner",
    headerName: "Proprietario",
    headerAlign: "center",
    align: "center",
    width: "200",
  },
  {
    field: "model",
    headerName: "Modelo",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "manufacturer",
    headerName: "Fabricante",
    headerAlign: "center",
    align: "center",
    width: "150",
  },
  {
    field: "identification",
    headerName: "Indetificação",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "serial_number",
    headerName: "Numero de Serie",
    headerAlign: "center",
    align: "center",
    width: "130"
  },
  {
    field: "created_at",
    headerName: "Adicionado em",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "added_by",
    headerName: "Adicionado por",
    headerAlign: "center",
    align: "center",
    width: "130",
  },
];

export const EquipmentColumns = (onEdit,onDelete,onViewMore) => [

  {
    field: "actions",
    headerName: "",
    //flex: "1",
    width: "95",
    //align: "center",
    renderCell: (cellValues) => {
      return (
        <>
          <IconButton 
            sx={{padding:"0px",m:"0 5px 0 0 "}}
            onClick={(event) => onEdit(event,cellValues)}
          >
            <EditOutlinedIcon />
          </IconButton>

          <IconButton 
            sx={{padding:"0px",m:"0 5px 0 0 "}}
            onClick={(event) => onViewMore(event,cellValues)}
          >
            <VisibilityIcon />
          </IconButton>

          <IconButton           
            sx={{padding:"0px"}}
            onClick={(event) => onDelete(event,cellValues)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      );
    },
  },
  ...EquipmentColumnsReduced,
];

export const ServiceOrderColumns = (onDelete) => [

  {
    field: "actions",
    headerName: "",
    // align: "center",
    // flex: 1,
    renderCell: (cellValues) => {
      return (
        <>
          <IconButton
            //className={classes.iconButton}
            onClick={() => onDelete(cellValues.id)}
          >
            <DeleteIcon/>
          </IconButton>
        </>
      );
    },
  },
  { field: "id", headerName: "ID", align: "center", width: "50" },
  {
    field: "number",
    headerName: "Numero",
    headerAlign: "center",
    align: "center",
    cellClassName: "name-column--cell",
  },
  {
    field: "state",
    headerName: "Estado",
    type: "string",
    headerAlign: "center",
    align: "center",
    
  },
  {
    field: "requester",
    headerName: "Solicitante",
    type: "string",
    headerAlign: "center",
    align: "center",
    width: "150",
  },
  {
    field: "executor",
    headerName: "Tecnico Executor",
    width: 120,
    headerAlign: "center",
    align: "center",
    wrap: 'true',
  },
  {
    field: "service_type",
    headerName: "Tipo de serviço",
    headerAlign: "center",
    align: "center",
    width: "150",
    //flex: 1,
  },
  {
    field: "closed_at",
    headerName: "Fechado em",
    headerAlign: "center",
    align: "center",
    //flex: 1,
  },
  {
    field: "title",
    headerName: "Titulo",
    headerAlign: "center",
    align: "center",
    width: "150",
    //flex: 1,
  },
  {
    field: "issue_description",
    headerName: "Descrição do Problema",
    headerAlign: "center",
    align: "center",
    width: "150",
  },
  {
    field: "created_at",
    headerName: "Adicionado em",
    headerAlign: "center",
    align: "center",
    //flex: 1,
  },
  {
    field: "equip.id",
    headerName: "Id do Equipamento",
    headerAlign: "center",
    align: "center",
    width: "150",
    //flex: 1,
    renderCell: (cellValues) => {
      return (
        <>
          {cellValues.id}
        </>
      );
    },
  
  },
];

export const CalibrationColumns  = (onDelete, onPrint) => [

  {
    field: "actions",
    headerName: "",
    renderCell: (cellValues) => {
      return (
        <>
          <IconButton
            //className={classes.iconButton}
            onClick={(event) => onPrint(event,cellValues)}
          >
            <PrintOutlinedIcon />

          </IconButton>
          <IconButton
            //className={classes.iconButton}
            onClick={() => onDelete(cellValues.id)}
          >
            <DeleteIcon />

          </IconButton>
        </>
      );
    },
  },
  { field: "id", headerName: "ID", align: "center", width: "50"},
  {
    field: "number",
    headerName: "Numero",
    headerAlign: "center",
    align: "center",
    //cellClassName: "name-column--cell",
  },
  {
    field: "requester",
    headerName: "Solicitante",
    type: "string",
    headerAlign: "center",
    align: "center",
    width: "150",
  },
  {
    field: "executor",
    headerName: "Tecnico Executor",
    headerAlign: "center",
    align: "center",
    width: "150",
  },
  {
    field: "expiration",
    headerName: "Validade",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "created_at",
    headerName: "Adicionado em",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "equip",
    headerName: "Id do Equipamento",
    headerAlign: "center",
    align: "center",
    width: "130",
    renderCell: (cellValues) => {
      return (
        <>
          {cellValues.id}
        </>
      );
    },
  },
];

export const TeamColumns  = [
  { field: "id", headerName: "ID", align: "center", width: "50"},
  {
    field: "first_name",
    headerName: "Nome(s)",
    headerAlign: "center",
    align: "center",
    cellClassName: "name-column--cell",
  },
  {
    field: "last_name",
    headerName: "Sobrenome(s)",
    type: "string",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "email",
    headerName: "E-mail",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "function",
    headerName: "Cargo",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "phone_number",
    headerName: "Numero de Telefone",
    cellClassName: "name-column--cell",
    headerAlign: "center",
    align: "center",
    width: "150",
  },
  {
    field: "matriculation",
    headerName: "Matricula",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "age",
    headerName: "Idade",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "location",
    headerName: "Locação",
    headerAlign: "center",
    align: "center",
  },
  
];