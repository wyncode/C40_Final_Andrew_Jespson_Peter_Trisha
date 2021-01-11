import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import NavBar from '../components/Home/Textsearch';
import storeByZipcodeandMiles from '../components/Home/ZipSearch';
import StoreCard from '../components/Home/Storecard';
import axios from 'axios';
import swal from 'sweetalert';

const Home = () => {
  const { stores, setStores, currentUser } = useContext(AppContext);

  useEffect(() => {
    if (!currentUser) return;
    storeByZipcode();
  }, [currentUser]);

  const storeByZipcode = async () => {
    const storesAddress = await axios.get(
      `/api/stores/radius/${currentUser.zip}/10`,
      {
        withCredentials: true
      }
    );
    console.log(storesAddress.data.data);
    setStores(storesAddress.data.data);
  };

  return (
    <div>
      <NavBar />
      <storeByZipcodeandMiles />
      {stores.map((store) => {
        return (
          <div key={store.id}>
            <StoreCard store={store} />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
