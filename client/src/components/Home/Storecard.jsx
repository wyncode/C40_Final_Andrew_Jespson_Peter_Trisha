import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { AppBar, Toolbar, Grid, Card, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

//styling in material UI

const useStyles = makeStyles({
  storeContainer: {
    paddingTop: '20px'
  },
  cardStyle: {
    root: {
      maxWidth: 345
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    }
  }
});

const StoreCard = ({ store }) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Card className={classes.root}>
          <CardHeader title={store.chefName} subheader="September 14, 2016" />
          <CardMedia className={classes.media} title="Paella dish" />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};
export default StoreCard;
