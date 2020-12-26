import React from 'react';

const userButton = ({ history }) => {
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

export default userButton;
