import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import swal from 'sweetalert';

const Login = ({ history }) => {
  const [formData, setFormData] = useState(null);
  const { currentUser, setCurrentUser } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', formData);
      setCurrentUser(response.data);
      console.log(response.data);
      sessionStorage.setItem('user', response.data);
      if (currentUser.role === 'chef') {
        history.push('/store');
      } else {
        history.push('/shop');
      }
      history.push('/shop');
    } catch (error) {
      swal(`Oops!`, 'Something went wrong.');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
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
        <input type="submit" value="Submit" />
      </form>
      <Link to="/register">Need an account? Sign up.</Link>
      <Link to="/forgotpassword">I forgot my password!</Link>
    </div>
  );
};

export default Login;
