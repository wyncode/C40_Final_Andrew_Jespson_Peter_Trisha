import React from 'react';
import { useHistory } from 'react-router-dom';

const ChefButton = () => {
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    history.push('/chef-register');
  };
  return (
    <div>
      <p>Are You A Chef ?</p>
      <button
        style={{
          border: '1px solid red',
          height: '100px',
          width: '100px'
        }}
        onClick={handleClick}
      >
        Register
      </button>
    </div>
  );
};

export default ChefButton;
