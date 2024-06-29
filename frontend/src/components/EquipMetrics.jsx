import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Stack from '@mui/material/Stack';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import CircularProgress from '@mui/material/CircularProgress';

function EquipMetrics({ data, mtbf}) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const percentageValue = 100.0;
  const per = `${percentageValue}%`;

  return (
    <Stack 
      direction="row"
      //justifyContent="center"
      alignItems="flex-end"
      spacing={15}
      m= '50px 50px 50px 50px'
      
    >
      <Box
        //m="0px 0px 0px 30px"
        sx={{
          marginLeft: '30px', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Gauge
          width={125} 
          height={125}
          value= {percentageValue}
          max={100.0}
          min={0}
          thickness={24}
          color ={ colors.greenAccent[500]} 
          
          sx={{
            align: "center",
            marginBottom: '15px',
            "& .MuiGauge-valueArc": {fill: colors.greenAccent[500]},
          }}
          text= {per}

        />
        <Typography variant="h4" align="center">
          Disponibilidade
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box  display="flex" sx={{ marginBottom: '30px', alignItems: 'flex-end' }}>
          <Typography variant="h8">
            0 dia(s) 
          </Typography>
          <Typography 
            //variant="h1" 
            sx={{
              fontWeight: 500, 
              fontSize: '60px', 
              color: colors.greenAccent[500]
            }}>
            00:00:00
          </Typography>
        </Box>
        <Typography variant="h4" align="center">
          Tempo Médio de Reparo
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box  display="flex" sx={{ marginBottom: '30px', alignItems: 'flex-end' }}>
          <Typography variant="h8">
            {mtbf.daysString} 
          </Typography>
          <Typography 
            //variant="h1" 
            sx={{
              fontWeight: 500, 
              fontSize: '60px', 
              color: colors.greenAccent[500]
            }}>
            {mtbf.timeString} 
          </Typography>
        </Box>
        <Typography variant="h4" align="center">
          Tempo Médio Entre Falhas
        </Typography>
      </Box>

    </Stack>
  );
};

export default EquipMetrics;