import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const ALaCarteMenu = ({ isOwner }) => {
  const { store, checked, setChecked, setLoading } = useContext(AppContext);
  const classes = useStyles();
  const history = useHistory();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const deleteDishes = async () => {
    try {
      checked.forEach(async (item) => {
        await axios.delete(`/api/dishes/${item._id}`);
      });
      setLoading(true);
      swal('Your items have been deleted');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <List className={classes.root}>
        {store.serviceMenu.map((dish) => {
          const dishId = `checkbox-list-secondary-label-${dish}`;
          return (
            <ListItem key={dish} button>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                id={dishId}
                primary={`${dish?.dishName}`}
                secondary={`${dish?.price}`}
              />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(dish)}
                  checked={checked.indexOf(dish) !== -1}
                  inputProps={{ 'aria-labelledby': dishId }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      {isOwner && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            padding: '5px'
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.push('/dishform');
            }}
            style={{ margin: '5px' }}
          >
            Create Dish
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: '5px' }}
            onClick={deleteDishes}
          >
            Delete Dishes
          </Button>
        </div>
      )}
    </>
  );
};

export default ALaCarteMenu;
