import React from 'react';
import { Link } from 'react-router-dom';

const userNav = () => {
  return (
    <nav>
      <Link>Account</Link>
      <Link>Store</Link>
      <Link>Appointments</Link>
      <Link>Logout</Link>
    </nav>
  );
};

export default userNav;
