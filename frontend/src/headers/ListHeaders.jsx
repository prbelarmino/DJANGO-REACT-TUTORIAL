// import { Button, Link, IconButton } from "@material-ui/core";
// import { Visibility as VisibilityIcon, Delete as DeleteIcon } from "@material-ui/icons";
// import { createStyles, makeStyles } from "@material-ui/core/styles";

import { IconButton } from '@mui/material';
import { Visibility as VisibilityIcon, Delete as DeleteIcon } from "@mui/icons-material";
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'; 
import { formatDate } from '../components/dateUtils';

export const EquipmentColumnsReduced = [

  { field: "id", headerName: "ID", align: "center", width: "50", headerClassName: 'super-app-theme--header',},
  {
    field: "type",
    headerName: "Tipo",
    ////flex: 1,
    //cellClassName: "name-column--cell",
    headerAlign: "center",
    align: "center",
    width: "200",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "state",
    headerName: "Estado",
    type: "string",
    headerAlign: "center",
    align: "center",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "owner",
    headerName: "Proprietario",
    headerAlign: "center",
    align: "center",
    width: "200",
    headerClassName: 'super-app-theme--header',
    renderCell: (cellValues) => {
      return (
        <>
        {cellValues.formattedValue.name}
        </>
      );
    },
    
  },
  {
    field: "model",
    headerName: "Modelo",
    headerAlign: "center",
    align: "center",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "manufacturer",
    headerName: "Fabricante",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "identification",
    headerName: "Indetificação",
    headerAlign: "center",
    align: "center",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "serial_number",
    headerName: "Numero de Serie",
    headerAlign: "center",
    align: "center",
    width: "130",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "created_at",
    headerName: "Adicionado em",
    headerAlign: "center",
    align: "center",
    headerClassName: 'super-app-theme--header',
    renderCell: (cellValues) => {
      return (
        <>
        {formatDate(cellValues.formattedValue)}
        </>
      );
    },
  },
  {
    field: "added_by",
    headerName: "Adicionado por",
    headerAlign: "center",
    align: "center",
    width: "130",
    headerClassName: 'super-app-theme--header',
  },
];

export const EquipmentColumns = (onEdit,onDelete,onViewMore) => [

  {
    field: "actions",
    headerName: "",
    //flex: "1",
    width: "110",
    //align: "center",
    headerClassName: 'super-app-theme--header',
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
            sx={{padding:"0px",m:"0 5px 0 0 "}}
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

export const ServiceOrderColumns = (onDelete, onEdit, onViewMore) => [

  {
    field: "actions",
    headerName: "",
    width: "115",
    headerClassName: 'super-app-theme--header',
    // align: "center",
    // flex: 1,
    renderCell: (cellValues) => {
      return (
        <>
          <IconButton
            //className={classes.iconButton}
            sx={{padding:"0px",m:"0 5px 0 0 "}}
            onClick={() => onDelete(cellValues.id)}
          >
            <DeleteIcon/>
          </IconButton>

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
        </>
      );
    },
  },
  { field: "id", headerName: "ID", align: "center", width: "50",
    headerClassName: 'super-app-theme--header',
   },
  {
    field: "number",
    headerName: "Numero",
    headerAlign: "center",
    align: "center",
    cellClassName: "name-column--cell",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "state",
    headerName: "Estado",
    type: "string",
    headerAlign: "center",
    align: "center",
    headerClassName: 'super-app-theme--header',
    
  },
  {
    field: "requester",
    headerName: "Solicitante",
    type: "string",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "executor",
    headerName: "Tecnico Executor",
    width: 120,
    headerAlign: "center",
    align: "center",
    wrap: 'true',
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "service_type",
    headerName: "Tipo de serviço",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
    //flex: 1,
  },
  {
    field: "closed_at",
    headerName: "Fechada em",
    headerAlign: "center",
    align: "center",
    headerClassName: 'super-app-theme--header',
    //flex: 1,
    renderCell: (cellValues) => {
      return (
        <>
        {formatDate(cellValues.formattedValue)}
        </>
      );
    },
  },
  {
    field: "title",
    headerName: "Titulo",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
    //flex: 1,
  },
  {
    field: "issue_description",
    headerName: "Descrição do Problema",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "created_at",
    headerName: "Aberta em",
    headerAlign: "center",
    align: "center",
    headerClassName: 'super-app-theme--header',
    //flex: 1,
    renderCell: (cellValues) => {
      return (
        <>
        {formatDate(cellValues.formattedValue)}
        </>
      );
    },
  },
  {
    field: "equip",
    headerName: "Equipamento",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
    //flex: 1,
    // renderCell: (cellValues) => {
    //   return (
    //     <>
    //       {cellValues.id}
    //     </>
    //   );
    // },
  
  },
];

export const CalibrationColumns  = (onDelete, onPrint) => [

  {
    field: "actions",
    headerName: "",
    headerClassName: 'super-app-theme--header',
    width: "75",
    renderCell: (cellValues) => {
      return (
        <>
          <IconButton
            //className={classes.iconButton}
            sx={{padding:"0px",m:"0 5px 0 0 "}}
            onClick={(event) => onPrint(event,cellValues)}
          >
            <PrintOutlinedIcon />

          </IconButton>
          <IconButton
            //className={classes.iconButton}
            sx={{padding:"0px",m:"0 5px 0 0 "}}
            onClick={() => onDelete(cellValues.id)}
          >
            <DeleteIcon />

          </IconButton>
        </>
      );
    },
  },
  { field: "id", headerName: "ID", align: "center", 
    width: "50",
    headerClassName: 'super-app-theme--header',},
  {
    field: "number",
    headerName: "Numero",
    headerAlign: "center",
    align: "center",
    headerClassName: 'super-app-theme--header',
    //cellClassName: "name-column--cell",
  },
  {
    field: "requester",
    headerName: "Solicitante",
    type: "string",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "executor",
    headerName: "Tecnico Executor",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "expiration",
    headerName: "Validade",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
    renderCell: (cellValues) => {
      return (
        <>
        {formatDate(cellValues.formattedValue)}
        </>
      );
    },
  },
  {
    field: "created_at",
    headerName: "Adicionado em",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
    renderCell: (cellValues) => {
      return (
        <>
        {formatDate(cellValues.formattedValue)}
        </>
      );
    },
  },
  {
    field: "equip",
    headerName: "Equipamento",
    headerAlign: "center",
    align: "center",
    width: "130",
    headerClassName: 'super-app-theme--header',
  },
];

export const TeamColumns  = [
  { field: "id", headerName: "ID", align: "center", width: "50",headerClassName: 'super-app-theme--header',},
  {
    field: "first_name",
    headerName: "Nome(s)",
    headerAlign: "center",
    align: "center",
    cellClassName: "name-column--cell",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "last_name",
    headerName: "Sobrenome(s)",
    type: "string",
    headerAlign: "center",
    align: "center",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "email",
    headerName: "E-mail",
    headerAlign: "center",
    align: "center",
    width: "200",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "function",
    headerName: "Cargo",
    headerAlign: "center",
    align: "center",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "phone_number",
    headerName: "Numero de Telefone",
    cellClassName: "name-column--cell",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "matriculation",
    headerName: "Matricula",
    headerAlign: "center",
    align: "center",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "birth_date",
    headerName: "Data de Nascimento",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
    renderCell: (cellValues) => {
      return (
        <>
        {formatDate(cellValues.formattedValue)}
        </>
      );
    },
  },
  {
    field: "location",
    headerName: "Locação",
    headerAlign: "center",
    align: "center",
    headerClassName: 'super-app-theme--header',
  },
  
];

export const ClientColumns  = (onDelete) => [

  {
    field: "actions",
    headerName: "",
    width: "50",
    headerClassName: 'super-app-theme--header',
    renderCell: (cellValues) => {
      return (
        <>
          <IconButton
            //className={classes.iconButton}
            sx={{padding:"0px"}}
            onClick={() => onDelete(cellValues.id)}
          >
            <DeleteIcon />

          </IconButton>
        </>
      );
    },
  },
  { field: "id", headerName: "ID", align: "center", width: "50",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "name",
    headerName: "Nome",
    headerAlign: "center",
    align: "center",
    width: "250",
    headerClassName: 'super-app-theme--header',
    //cellClassName: "name-column--cell",
  },
  {
    field: "cnpj",
    headerName: "CNPJ",
    type: "string",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "contract_number",
    headerName: "Número do Contrato",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
  },
];

export const LocationColumns  = (onDelete) => [

  {
    field: "actions",
    headerName: "",
    width: "50",
    headerClassName: 'super-app-theme--header',
    renderCell: (cellValues) => {
      return (
        <>
          <IconButton
            //className={classes.iconButton}
            sx={{padding:"0px",m:"0 5px 0 0 "}}
            onClick={() => onDelete(cellValues.id)}
          >
            <DeleteIcon />

          </IconButton>
        </>
      );
    },
  },
  { field: "id", headerName: "ID", align: "center", width: "50",headerClassName: 'super-app-theme--header',},
  {
    field: "name",
    headerName: "Nome",
    headerAlign: "center",
    align: "center",
    headerClassName: 'super-app-theme--header',
    //cellClassName: "name-column--cell",
  },
  {
    field: "supervisor",
    headerName: "Responsável",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "phone_number",
    headerName: "Telefone",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "street",
    headerName: "Rua",
    type: "string",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "number",
    headerName: "Número",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "neighborhood",
    headerName: "Bairro",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "cep",
    headerName: "CEP",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "city",
    headerName: "Cidade",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "state",
    headerName: "Estado",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "client",
    headerName: "Client",
    headerAlign: "center",
    align: "center",
    width: "150",
    headerClassName: 'super-app-theme--header',
    renderCell: (cellValues) => {
      return (
        <>
          {cellValues.formattedValue.name} 
        </>
      );
    },
  },
];