import React, { useState, useContext } from 'react';

const NavBar = () => {
  const [formData, setFormData] = useState(null);
  const { stores, setStores, currentUser } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/stores/radius/${currentUser.zip}/10/search`,
        {
          withCredentials: true
        },
        formData
      );
      setStores(response.data.data);
    } catch (error) {
      swal(`Oops!`, 'Something went wrong.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          style={BarStyling}
          placeholder="search country"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default NavBar;
