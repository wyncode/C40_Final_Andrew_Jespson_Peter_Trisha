import React, { useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import StoreHeader from '../components/StoreFront/StoreHeader';
import StoreTabPanel from '../components/StoreFront/StoreTabPanel';
import axios from 'axios';

const ChefStore = () => {
  const { store, setStore, loading, setLoading } = useContext(AppContext);
  const { id } = useParams();
  useEffect(async () => {
    console.log(id);
    await axios
      .get(`api/stores/${id}`)
      .then((res) => {
        setStore(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [setStore, loading, setLoading, id]);

  return (
    <div>
      <StoreHeader />
      <StoreTabPanel />
    </div>
  );
};

export default ChefStore;
