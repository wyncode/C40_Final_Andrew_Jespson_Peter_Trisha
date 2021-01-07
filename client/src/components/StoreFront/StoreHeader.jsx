import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';

const StoreHeader = () => {
  const { currentStore, setCurrentStore } = useContext(AppContext);
  useEffect(async () => {
    const data = await axios.get(`api/stores/:id`);
    setCurrentStore(data.data);
  }, []);
  return (
    <div>
      <h2> {currentStore?.chefName} </h2>
      <h2> {currentStore?.priceRange} </h2>
      <h3> {currentStore?.foodType} </h3>
      <h4> Hours: </h4>
      <h3> {currentStore?.operatingHours} </h3>
      <h4> Service Fee: </h4>
      <h4> {currentStore?.serviceFee} </h4>
    </div>
  );
};

export default StoreHeader;
