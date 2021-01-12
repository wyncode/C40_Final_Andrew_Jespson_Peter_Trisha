import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
//import { useParams } from 'react-router-dom';
import StoreHeader from '../components/StoreFront/StoreHeader';
import StoreTabPanel from '../components/StoreFront/StoreTabPanel';
import axios from 'axios';
import NavBar from '../components/Home/NavBar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

const ChefStore = ({ match, history }) => {
  const { store, setStore, loading, setLoading, currentUser } = useContext(
    AppContext
  );
  const { id } = match.params;
  const [isOwner, setIsOwner] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    console.log(currentUser);
    if (currentUser?.chefStore === id) {
      setIsOwner(true);
    }
  }, [currentUser]);

  useEffect(() => {
    console.log(id);
    axios
      .get(`/api/stores/${id}`)
      .then((res) => {
        setStore(res.data);
        console.log(res.data);
        setLoading(false);
        sessionStorage.setItem('currentStore', res.data);
      })
      .catch((e) => console.log(e));
  }, [setStore, loading, setLoading, id]);

  return (
    <div className={classes.root}>
      <NavBar />
      <StoreHeader />
      <StoreTabPanel />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        {isOwner ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.push('/storeform');
            }}
          >
            Update Store
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default ChefStore;
