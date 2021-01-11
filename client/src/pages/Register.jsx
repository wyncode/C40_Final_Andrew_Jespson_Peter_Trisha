import React, { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const UserRegister = ({ history }) => {
  const [formData, setFormData] = useState(null);
  const [value, setValue] = useState(null);
  const { setCurrentUser } = useContext(AppContext);
  const classes = useStyles();

  const handleChange = (e) => {
    setValue(e.target.value);
    setFormData({ ...formData, [e.target.name]: str2bool(e.target.value) });
  };

  var str2bool = (value) => {
    if (value && typeof value === 'string') {
      if (value.toLowerCase() === 'true') return true;
      if (value.toLowerCase() === 'false') return false;
    }
    return value;
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/register', formData);
      setCurrentUser(response.data.user);
      sessionStorage.setItem('user', response.data);
      history.push('/');
    } catch (error) {
      swal('SignUp Error: ', error.toString());
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                What type of user are you?
              </FormLabel>
              <RadioGroup
                row
                aria-label="position"
                name="chef"
                value={value}
                onChange={handleChange}
              >
                <Grid item xs={6}>
                  <FormControlLabel
                    value="true"
                    control={<Radio color="primary" />}
                    label="I'm a Chef"
                    labelPlacement="start"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    value="false"
                    control={<Radio color="primary" />}
                    label="I'm a Customer"
                    labelPlacement="start"
                  />
                </Grid>
              </RadioGroup>
            </FormControl>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                label="First Name"
                id="firstName"
                variant="outlined"
                required
                fullWidth
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="lname"
                name="lastName"
                label="Last Name"
                id="lastName"
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                label="Email Address"
                id="email"
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="current-password"
                name="password"
                label="Password"
                id="password"
                variant="outlined"
                type="password"
                required
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phoneNumber"
                label="Phone Number"
                id="phoneNumber"
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                name="street"
                label="Street"
                id="street"
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="city"
                label="City"
                id="city"
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="state"
                label="State"
                id="state"
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="zip"
                label="Zip"
                id="zip"
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="dateOfBirth"
                label="Date Of Birth"
                InputLabelProps={{
                  shrink: true
                }}
                id="date"
                type="date"
                variant="outlined"
                labelPlacement="end"
                required
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid item xs={14}>
              <FormControlLabel
                control={<Checkbox name="emailPromotion" color="primary" />}
                label={<span style={{ fontSize: '14.5px' }}>I would like to receive news, seasonal updates, and special promotions via email.</span>}
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            value="Submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="space-evenly">
            <Grid item>
              <Link href="/login" variant="body1">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default UserRegister;
