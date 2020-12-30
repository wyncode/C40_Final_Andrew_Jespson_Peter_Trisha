import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import swal from 'sweetalert';

const ChefRegister = ({ history }) => {
  const [formData, setFormData] = useState();

  const { setCurrentUser } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/register', formData);
      setCurrentUser(response.data.user);
      sessionStorage.setItem('user', response.data);
      history.push('/');
    } catch (error) {
      swal('SignUp Error: ', error.toString());
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="chef"
          type="chef"
          placeholder="type true"
          name="chef"
          onChange={handleChange}
        />
        <input
          id="firstName"
          type="firstName"
          placeholder="firstname"
          name="firstName"
          onChange={handleChange}
        />
        <input
          id="lastName"
          type="lastName"
          placeholder="lastname"
          name="lastName"
          onChange={handleChange}
        />
        <input
          id="email"
          type="email"
          placeholder="Email Address"
          name="email"
          onChange={handleChange}
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <input
          id="phoneNumber"
          type="phoneNumber"
          placeholder="Phone Number"
          name="phoneNumber"
          onChange={handleChange}
        />
        <input
          id="street"
          type="street"
          placeholder="street"
          name="street"
          onChange={handleChange}
        />
        <input
          id="city"
          type="city"
          placeholder="city"
          name="city"
          onChange={handleChange}
        />
        <input
          id="state"
          type="state"
          placeholder="state"
          name="state"
          onChange={handleChange}
        />
        <input
          id="zip"
          type="zip"
          placeholder="zipcode"
          name="zip"
          onChange={handleChange}
        />
        <input
          id="dateOfBirth"
          type="dateOfBirth"
          placeholder="Date Of Birth"
          name="dateOfBirth"
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
      <Link to="/login">Have an account? Login.</Link>
    </div>
  );
};

export default ChefRegister;
