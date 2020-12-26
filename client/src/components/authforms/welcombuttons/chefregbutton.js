import React from 'react';

const chefButton = ({ history }) => {
  const handleClick = (e) => {
    e.preventDefault();
    history.push('/chef-register');
  };
  return (
    <div>
      <p>Are You A Chef ?</p>
      <button onClick={handleClick}>Register</button>
    </div>
  );
};

export default chefButton;
