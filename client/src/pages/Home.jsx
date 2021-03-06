import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import StoreCard from '../components/Home/Storecard';
import axios from 'axios';
import NavBar from '../components/Home/NavBar';

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
    setStores(storesAddress.data.data);
  };

  return (
    <div>
      <NavBar />
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
