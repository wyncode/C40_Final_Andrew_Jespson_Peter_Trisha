import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const StoreHeader = () => {
  const { store } = useContext(AppContext);

  /* Creating a re route in case there isn't a story, */

  return (
    <Box color="text.primary">
      <Typography variant="h6" gutterBottom>
        {' '}
        {store?.chefName}{' '}
      </Typography>
      <Typography variant="h4" gutterBottom>
        {' '}
        {store?.priceRange}{' '}
      </Typography>
      <Typography variant="subtitle1">
        <span>{store?.foodType}</span>
      </Typography>
      <Typography variant="subtitle1">
        <span>Hours:</span>
      </Typography>
      <Typography variant="subtitle1">
        <span>{store?.operatingHours}</span>
      </Typography>
      <Typography variant="subtitle1"> Service Fee: </Typography>
      <Typography variant="subtitle1"> {store?.serviceFee} </Typography>
    </Box>
  );
};

export default StoreHeader;
