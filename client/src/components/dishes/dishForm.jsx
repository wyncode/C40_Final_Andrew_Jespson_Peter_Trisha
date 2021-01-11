import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { Link } from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const DishForm = ({ history }) => {
  const classes = useStyles();

  const [dish, setDish] = useState('');
  const handleChange = (e) => {
    setDish({ ...dish, [e.target.name]: e.target.value });
  };
  const handleDishSubmission = async (e) => {
    const form = e.target;
    e.preventDefault();
    try {
      const response = await axios({
        method: 'POST',
        url: '/api/dishes',
        withCredentials: true,
        data: dish
      });
      swal('New Meal!', 'Your meal has been added', 'success');
      setDish(response.data);
      history.push('/dishimages');
    } catch (error) {
      swal('Oops', 'Something went wrong');
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleDishSubmission}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="dishName"
            label="dishName"
            name="dishName"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="price"
            label="price"
            name="price"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="specialDescription"
            label="specialDescription"
            name="specialDescription"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default DishForm;
