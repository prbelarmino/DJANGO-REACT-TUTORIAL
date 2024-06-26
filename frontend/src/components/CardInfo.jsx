import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "./Header";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {EquipmentDictionary} from "../headers/ModelDictionaries"

function CardInfo({ data, keysToDisplay}) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{m: "30px 0 70px 20px", width: '500px' }}>
      <Typography 
      sx={{
          m: " 0 0 0 30px",
          fontSize: 14,
          //fontWeight: 'bold',
          backgroundColor: colors.greenAccent[500] ,
          borderRadius: '4px', // Applying rounded corners
          marginLeft: '0px',
          padding: '5px', // Adding padding for better visual appearance
          color: theme.palette.background.default
      }}
          width= "110px"
          gutterBottom
      > 
          Dados Básicos
      </Typography>
      <Card 
        sx={{
          minWidth: 275, 
          borderTopLeftRadius: -5, 
          borderTopRightRadius: 0, 
          backgroundColor: theme.palette.background.default,
          }}
        >
          <CardContent sx={{
            '&:last-child': {
              paddingBottom: '5px',
            },
          }}>
            {keysToDisplay.map((item, index) => (
              <Box key={index} sx={{display: "flex", marginBottom: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    marginRight: '10px',
                    minWidth: '100px'
                  }}
                >
                  {EquipmentDictionary[item]}:
                </Typography>
                <Typography>
                  {item == "added_by" ? data[item].first_name + " " +
                   data[item].last_name : data[item]}
                </Typography>
              </Box>
            ))}
          </CardContent>
      </Card>
  </Box>
  );
};

export default CardInfo;