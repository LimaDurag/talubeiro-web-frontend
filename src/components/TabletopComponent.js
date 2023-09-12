import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

function Tabletop() {
  // An array of 40 location names
  const locations = [
    'Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5', // ... and so on
    'Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5', // ... and so on
    'Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5', // ... and so on
    'Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5', // ... and so on
    'Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5', // ... and so on
    'Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5', // ... and so on
    'Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5', // ... and so on
    'Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5', // ... and so on
  ];

  return (
    <Grid container spacing={2}>
      {locations.map((location, index) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">{location}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default Tabletop;
