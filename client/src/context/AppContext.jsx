import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState([]);
  const history = useHistory();

  const user = sessionStorage.getItem('user');

  // useEffect(() => {
  //   axios
  //     .get(`api/stores/5ff37cea949fdc35bbdd57b5`, { withCredentials: true })
  //     .then(res => {
  //       setStore(res.data);
  //       setLoading(false);
  //     })
  //     .catch(e => console.log(e));
  // }, []);

  useEffect(() => {
    if (user && !currentUser) {
      axios
        .get('/api/users/me', { withCredentials: true })
        .then(({ data }) => {
          setCurrentUser(data);
        })
        .catch((error) => {
          swal('Oops!', error.toString());
        });
    }
  }, [currentUser, user]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
        store,
        setStore
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
