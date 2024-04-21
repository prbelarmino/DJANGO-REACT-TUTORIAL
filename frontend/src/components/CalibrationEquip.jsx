import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "./Header";
import {CalibrationColumns} from "../headers/ListHeaders"
import CustomList from "../components/CustomList";

function CalibrationEquip({ rows, onDelete, onAdd }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="30px">
      <Header title="Calibrações" subtitle="Lista de Calibrações do Equipamento" />
      <Button
                variant="contained"
                color="secondary"
                onClick={onAdd}
            >
                Adicionar Calibração
      </Button> 
      <CustomList 
        rows={rows}
        columns={CalibrationColumns(onDelete)}
        height={"60vh"}
      />
    </Box>
  );
};

export default CalibrationEquip;