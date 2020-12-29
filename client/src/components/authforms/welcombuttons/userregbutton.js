import React from 'react';
import { useHistory } from 'react-router-dom';

const UserButton = () => {
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    history.push('/user-register');
  };
  return (
    <div>
      <p>Enjoy Chef's Cooking at Your Leisure</p>
      <button onClick={handleClick}>Register</button>
    </div>
  );
};

export default UserButton;
