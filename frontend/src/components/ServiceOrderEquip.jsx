import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "./Header";
import {ServiceOrderColumns} from "../headers/ListHeaders"
import CustomList from "../components/CustomList";

function ServiceOrderEquip({ rows, onDelete, onCreate }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Ordem de Serviços" subtitle="Lista de Ordem de Serviços" />
      <Button
          variant="contained"
          color="secondary"
          onClick={onCreate}
      >
          Criar Ordem de Serviço
      </Button>
        <CustomList 
          rows={rows}
          columns={ServiceOrderColumns(onDelete)}
          height={"60vh"}
        />
      </Box>

  );
};

export default ServiceOrderEquip;