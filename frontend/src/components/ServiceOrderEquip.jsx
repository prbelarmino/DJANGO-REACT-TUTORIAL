import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "./Header";
import {ServiceOrderColumns} from "../headers/ListHeaders"
import CustomList from "../components/CustomList";

function ServiceOrderEquip({ rows, onDelete,onEdit,onViewMore }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Ordem de Serviços" subtitle="Lista de Ordem de Serviços" />
        <CustomList 
          rows={rows}
          columns={ServiceOrderColumns(onDelete,onEdit,onViewMore)}
          height={"60vh"}
        />
      </Box>

  );
};

export default ServiceOrderEquip;