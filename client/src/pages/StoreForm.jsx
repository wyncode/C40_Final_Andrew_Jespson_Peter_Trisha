import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import swal from 'sweetalert';

const StoreForm = ({ history }) => {
  const [formData, setFormData] = useState(null);
  const { currentUserStore, setCurrentUserStore } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/stores', formData, {
        withCredentials: true
      });
      console.log(response.data);
      setCurrentUserStore(response.data);
      history.push('/myStore');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="chefName"
          type="chefName"
          placeholder="what's you Store name?"
          name="chefName"
          onChange={handleChange}
        />
        <input
          id="bio"
          type="bio"
          placeholder="Describe you store"
          name="bio"
          onChange={handleChange}
        />
        <input
          id="careerHighlights"
          type="careerHighlights"
          placeholder="careerHighlights"
          name="careerHighlights"
          onChange={handleChange}
        />
        <input
          id="educationalBackground"
          type="educationalBackground"
          placeholder="educationalBackground"
          name="educationalBackground"
          onChange={handleChange}
        />
        <input
          id="specializedCertifications"
          type="specializedCertifications"
          placeholder="specializedCertifications"
          name="specializedCertifications"
          onChange={handleChange}
        />
        <input
          id="address"
          type="address"
          placeholder="address"
          name="address"
          onChange={handleChange}
        />
        <input
          id="website"
          type="website"
          placeholder="website"
          name="website"
          onChange={handleChange}
        />
        <input
          id="foodType"
          type="foodType"
          placeholder="foodType"
          name="foodType"
          onChange={handleChange}
        />
        <input
          id="operatingHours"
          type="operatingHours"
          placeholder="operatingHours"
          name="operatingHours"
          onChange={handleChange}
        />
        <input
          id="serviceFee"
          type="serviceFee"
          placeholder="serviceFee"
          name="serviceFee"
          onChange={handleChange}
        />
        <input
          id="specialRequest"
          type="specialRequest"
          placeholder="specialRequest"
          name="specialRequest"
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default StoreForm;
