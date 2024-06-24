import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

function CircularProgressWithLabel({progress}) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
    <CircularProgress variant="determinate" value={progress}/>
    <Box
    sx={{
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography variant="caption" component="div" color="text.secondary">
      {`${Math.round(progress)}%`}
    </Typography>
  </Box>
</Box>
  );
}

export default CircularProgressWithLabel;