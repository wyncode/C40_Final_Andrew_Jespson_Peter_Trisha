import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));

const SearchZipMiles = () => {
  const classes = useStyles();
  const { setStores } = useContext(AppContext);
  const [zipcode, setZipcode] = useState('');
  const [distance, setDistance] = useState('');

  const storeByZipcodeandMiles = async (event) => {
    const storesAddress = await axios.get(`/api/stores/radius/${zipcode}/15`, {
      withCredentials: true
    });
    console.log(storesAddress.data.data);
    setStores(storesAddress.data.data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('object');
    storeByZipcodeandMiles();
  };

  const zipChange = (event) => {
    setZipcode(event.target.value);
  };
  const distanceChange = (event) => {
    setDistance(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <div onClick={handleSubmit}>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
        </div>
        <InputBase
          placeholder="Search Zip Code…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={zipChange}
        />
      </div>
    </form>
  );
};

export default SearchZipMiles;
