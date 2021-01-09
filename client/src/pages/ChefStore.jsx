import React, { useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import StoreHeader from '../components/StoreFront/StoreHeader';
import StoreTabPanel from '../components/StoreFront/StoreTabPanel';
import axios from 'axios';

const ChefStore = () => {
  const { store, setStore, loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    axios
      .get(`api/stores/${store._id}`)
      .then((res) => {
        setStore(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [setStore, loading, setLoading]);

  return (
    <div>
      <StoreHeader />
      <StoreTabPanel />
    </div>
  );
};

export default ChefStore;
