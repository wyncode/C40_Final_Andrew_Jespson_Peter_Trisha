import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
//import { useParams } from 'react-router-dom';
import StoreHeader from '../components/StoreFront/StoreHeader';
import StoreTabPanel from '../components/StoreFront/StoreTabPanel';
import axios from 'axios';
import NavBar from '../components/Home/NavBar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

const ChefStore = ({ match, history }) => {
  const {
    store,
    setStore,
    loading,
    setLoading,
    currentUser,
    checked
  } = useContext(AppContext);
  const { id } = match.params;
  const [isOwner, setIsOwner] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (currentUser?.chefStore === id) {
      setIsOwner(true);
    }
  }, [currentUser, store]);

  useEffect(() => {
    axios
      .get(`/api/stores/${id}`)
      .then((res) => {
        setStore(res.data);
        setLoading(false);
        sessionStorage.setItem('currentStore', res.data);
      })
      .catch((e) => console.log(e));
  }, [setStore, loading, setLoading, id]);

  const handleOrder = async () => {
    try {
      let sum = 0;
      checked.forEach((item) => {
        sum = sum + item.price;
      });
      const form = {
        cartItems: checked,
        serviceFee: store.serviceFee,
        totalCost: sum + store.serviceFee,
        store: store._id
      };

      await axios.post('/api/bookings', form, { withCredentials: true });
      swal('Your booking has been placed!');
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <NavBar />
      <StoreHeader />
      <StoreTabPanel isOwner={isOwner} />
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
        ) : (
          <Button variant="contained" color="primary" onClick={handleOrder}>
            Order
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChefStore;
