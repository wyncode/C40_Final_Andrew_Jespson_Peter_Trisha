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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const ALaCarteMenu = () => {
  const { store } = useContext(AppContext);
  const classes = useStyles();
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    console.log(checked);
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
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
  );
};

export default ALaCarteMenu;
