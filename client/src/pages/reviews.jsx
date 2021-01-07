import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import swal from 'sweetalert';

const UserReviews = ({ history }) => {
  const [formData, setFormData] = useState(null);
  const { setCurrentUser } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/reviews', formData);
      setCurrentUser(response.data.user);
      sessionStorage.setItem('user', response.data);
      history.push('/reviews');
    } catch (error) {
      swal('Review Error: ', error.toString());
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="ratingTitle"
          type="String"
          placeholder="Title: "
          name="title"
          onChange={handleChange}
        />
        <input
          id="ratingComment"
          type="String"
          placeholder="Comment: "
          name="comment"
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default UserReviews;
