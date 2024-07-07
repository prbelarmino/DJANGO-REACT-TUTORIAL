import { Box, Typography, useTheme, Grid } from "@mui/material";
import { tokens } from "../theme";
import Header from "./Header";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function OSDetails({ data}) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{m: "30px 0 40px 20px", width: '700px' }}>
      <Card 
        variant="filled"
        sx={{
          minWidth: 275, 
          borderTopLeftRadius: 0, 
          borderRadius: -5, 
          backgroundColor: theme.palette.primary.shadow,
          }}
      >
        <CardContent 
          sx={{
          '&:last-child': {
            paddingBottom: '15px',
          },}}
        >
          <Box
            display="grid"
            gap="15px"
            gridTemplateColumns="repeat(8, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: "span 8" },
            }}
          >
            <Typography
              sx={{
                fontWeight: 'bold',
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              Número: 
            </Typography>
            <Typography
              sx={{
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              {data.number}
            </Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              Requerente: 
            </Typography>
            <Typography
              sx={{
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              {data.requester}
            </Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              Técnico Executor: 
            </Typography>
            <Typography
              sx={{
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              {data.executor}
            </Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              Tipo de Serviço: 
            </Typography>
            <Typography
              sx={{
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              {data.service_type} 
            </Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              Prioridade: 
            </Typography>
            <Typography
              sx={{
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              {data.priority}
            </Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              Título:
            </Typography>
            <Typography
              sx={{
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              {data.title}
            </Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              Modelo: 
            </Typography>
            <Typography
              sx={{
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              {data.equip.model}
            </Typography>  
            <Typography
              sx={{
                fontWeight: 'bold',
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              Manufacturer: 
            </Typography>
            <Typography
              sx={{
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              {data.equip.manufacturer}
            </Typography> 
            <Typography
              sx={{
                fontWeight: 'bold',
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              Numero de Série: 
            </Typography>
            <Typography
              sx={{
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              {data.equip.serial_number}
            </Typography> 
            <Typography
              sx={{
                fontWeight: 'bold',
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              Tipo: 
            </Typography>
            <Typography
              sx={{
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              {data.equip.type}
            </Typography> 
            <Typography
              sx={{
                fontWeight: 'bold',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              Proprietário: 
            </Typography>
            <Typography
              sx={{
                minWidth: '100px',
                gridColumn: "span 6" 
              }}
            >
              {data.equip.owner.name}
            </Typography> 
            <Typography
              sx={{
                fontWeight: 'bold',
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              Responsável: 
            </Typography>
            <Typography
              sx={{
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              {data.equip.owner.supervisor}
            </Typography> 
            <Typography
              sx={{
                fontWeight: 'bold',
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              Cliente: 
            </Typography>
            <Typography
              sx={{
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              {data.equip.owner.client.name}
            </Typography> 
            <Typography
              sx={{
                fontWeight: 'bold',
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              Descrição do Problema: 
            </Typography>
            <Typography
              sx={{
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 6" 
              }}
            >
              {data.issue_description}
            </Typography> 
            <Typography
              sx={{
                fontWeight: 'bold',
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              Descrição do Serviço: 
            </Typography>
            <Typography
              sx={{
                //marginRight: '10px',
                minWidth: '100px',
                gridColumn: "span 2" 
              }}
            >
              {data.solution}
            </Typography> 
            
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OSDetails;