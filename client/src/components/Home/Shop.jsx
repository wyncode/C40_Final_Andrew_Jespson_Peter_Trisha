import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { AppBar, Toolbar, Grid, Card, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import swal from 'sweetalert';

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

const Shop = () => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [stores, setStores] = useState([]);
  const { currentUser } = useContext(AppContext);

  const textChange = (event) => {
    setText(event.target.value);
  };

  //1. get by userId
  useEffect(() => {
    if (!currentUser) return;
    storeByZipcode();
  }, [currentUser]);

  //TEXT search to get
  useEffect(
    () => {
      if (!currentUser) return;
      const delay = setTimeout(() => {}, 300);
      return () => clearTimeout(delay);
    },
    [currentUser],
    [text]
  );

  //get stores from user location zipcode
  const storeByZipcode = async () => {
    const storesAddress = await axios.get(
      `/api/stores/radius/${currentUser.zip}/10`,
      {
        withCredentials: true
      }
    );
    setStores(storesAddress.data);
  };

  const textSearch = async () => {
    try {
      const storeTextsearch = await axios.post(
        `/api/stores/radius/${currentUser.zip}/10/search/filters`,
        { params: { text } }
      );
      console.log(storeTextsearch.data);
      setStores(storeTextsearch.data);
    } catch (error) {
      swal(`Oops!`, 'Something went wrong.');
    }
  };

  const handleSubmit = async () => {
    textSearch();
  };
  // get Store by search

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <SearchIcon onClick={handleSubmit} />
          <TextField
            type="search"
            value={text}
            placeholder="search"
            onChange={textChange}
          />
        </Toolbar>
      </AppBar>
      <Grid container direction="column" justify="center" alignItems="center">
        <Card className={classes.root}>
          <CardHeader
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
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

export default Shop;
