import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

const SearchZipMiles = () => {
  const { setStores } = useContext(AppContext);
  const [zipcode, setZipcode] = useState('');
  const [distance, setDistance] = useState('');

  const storeByZipcodeandMiles = async () => {
    const storesAddress = await axios.get(
      `/api/stores/radius/${zipcode}/${distance}`,
      {
        withCredentials: true
      }
    );
    console.log(storesAddress.data.data);
    setStores(storesAddress.data.data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    storeByZipcodeandMiles();
  };

  const zipChange = (event) => {
    setZipcode(event.target.value);
  };
  const distanceChange = (event) => {
    setDistance(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          placeholder="zipcode"
          onChange={zipChange}
          required
        />
        <input
          type="text"
          id="distance"
          name="distance"
          placeholder="miles"
          onChange={distanceChange}
          required
        />
        <input type="submit" name="submit" />
      </form>
    </div>
  );
};
