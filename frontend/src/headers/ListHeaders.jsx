// import { Button, Link, IconButton } from "@material-ui/core";
// import { Visibility as VisibilityIcon, Delete as DeleteIcon } from "@material-ui/icons";
// import { createStyles, makeStyles } from "@material-ui/core/styles";

import { Button, IconButton, Link } from "@material-ui/core";
import { Visibility as VisibilityIcon, Delete as DeleteIcon } from "@material-ui/icons";

// const handleClick = (event, cellValues) => {
//   console.log(cellValues.row);
// };

export const EquipmentColumns = (onDelete,onViewMore) => [

  { field: "id", headerName: "ID" },
  {
    field: "type",
    headerName: "Tipo",
    //flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "state",
    headerName: "Estado",
    type: "number",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "owner",
    headerName: "Proprietario",
    flex: 1,
  },
  {
    field: "manufacturer",
    headerName: "Fabricante",
    flex: 1,
  },
  {
    field: "identification",
    headerName: "Indetificação",
    flex: 1,
  },
  {
    field: "serial_number",
    headerName: "Numero de Serie",
    flex: 1,
  },
  {
    field: "created_at",
    headerName: "Adicionado em",
    flex: 1,
  },
  {
    field: "author",
    headerName: "Adicionado por",
    flex: 1,
  },
  // {
  //   field: "Print",
  //   renderCell: (cellValues) => {
  //     return (
  //       <Button
  //         variant="contained"
  //         color="primary"
  //         onClick={(event) => {
  //           handleClick(event, cellValues);
  //         }}
  //       >
  //         Print
  //       </Button>
  //     );
  //   }
  // },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (cellValues) => {
      return (
        <>
          <IconButton
            //className={classes.iconButton}
            onClick={(event) => onViewMore(event,cellValues)}
          >
            <VisibilityIcon />

          </IconButton>

          <IconButton
            //className={classes.iconButton}
            onClick={(event) => onDelete(event,cellValues)}
          >
            <DeleteIcon />

          </IconButton>
        </>
      );
    },
  },
];

export const ServiceOrderColumns = (onDelete) => [
  { field: "id", headerName: "ID" },
  {
    field: "number",
    headerName: "Numero",
    //flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "requester",
    headerName: "Solicitante",
    type: "string",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "executor",
    headerName: "Tecnico Executor",
    flex: 1,
  },
  {
    field: "service_type",
    headerName: "Tipo de serviço",
    flex: 1,
  },
  {
    field: "closed_at",
    headerName: "Fechado em",
    flex: 1,
  },
  {
    field: "title",
    headerName: "Titulo",
    flex: 1,
  },
  {
    field: "issue_description",
    headerName: "Descrição do Problema",
    flex: 1,
  },
  {
    field: "created_at",
    headerName: "Adicionado em",
    flex: 1,
  },
  {
    field: "equip_id",
    headerName: "Id do Equipamento",
    flex: 1,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (cellValues) => {
      return (
        <>

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
];

export const CalibrationColumns  = (onDelete) => [
  { field: "id", headerName: "ID" },
  {
    field: "number",
    headerName: "Numero",
    //flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "requester",
    headerName: "Solicitante",
    type: "string",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "executor",
    headerName: "Tecnico Executor",
    flex: 1,
  },
  {
    field: "expiration",
    headerName: "Validade",
    flex: 1,
  },
  {
    field: "created_at",
    headerName: "Adicionado em",
    flex: 1,
  },
  {
    field: "equip_id",
    headerName: "Id do Equipamento",
    flex: 1,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (cellValues) => {
      return (
        <>
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
];