import { Typography, Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../theme";
import ConstructionIcon from '@mui/icons-material/Construction';
import AddIcon from '@mui/icons-material/Add';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Button from '@mui/material/Button';
import UploadForm from "../components/UploadForm";


const EquipmentsHeader = ({getEquipments}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box  mb="50px" 
          display="flex"
          alignItems="center">
      <Typography
        variant="h3"
        fontWeight="bold"
        color={colors.greenAccent[400]}
        sx={{ m: "0 5px 0 0" }}
      >
        |
      </Typography>
      <Typography
        variant="h3"
        color={colors.grey[100]}  
        sx={{ m: "0 15px 0 0"}}
      >
        Equipamentos
      </Typography>
      <ConstructionIcon fontSize="large" sx={{ m: "0 25px 0 0" }}/>
      <Button
          variant="contained"
          color="secondary"
          href="/equipments/add"
          size="small"
          sx={{ m: "0 15px 0 0", textTransform: "None", p: "3px 10px 3px 3px",minWidth: "90px"}}
      >
        <AddIcon />
        Adicionar
      </Button>
      <UploadForm updateList={getEquipments}  />
      
      <Button
          variant="contained"
          color="secondary"
          size="small"
          disabled={true}
          sx={{ m: "0 15px 0 0", textTransform: "None", p: "3px 10px 3px 10px",minWidth: "120px"}}
      >
        <ShowChartIcon sx={{ m: "0 5px 0 0"}}/>
        Análise de Dados
      </Button>
    </Box>
  );
};

export default EquipmentsHeader;
