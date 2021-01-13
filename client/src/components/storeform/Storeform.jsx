import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
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

export default function StoreForm({ history }) {
  const classes = useStyles();
  const [updateMode, setUpdateMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const { currentUserStore, setCurrentUserStore, currentUser } = useContext(
    AppContext
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (updateMode) {
        response = await axios.post('/api/stores', formData, {
          withCredentials: true
        });
      } else {
        response = await axios.patch(
          `/api/stores/${currentUser.chefStore}`,
          formData,
          { withCredentials: true }
        );
      }
      setCurrentUserStore(response.data);
      history.push(`/stores/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register your Store
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="chefName"
            label="chefName"
            name="chefName"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="bio"
            label="bio"
            name="bio"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="careerHighlights"
            label="careerHighlights"
            name="careerHighlights"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="educationalBackground"
            label="educationalBackground"
            name="educationalBackground"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="specializedCertifications"
            label="specializedCertifications"
            name="specializedCertifications"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="address"
            label="address"
            type="address"
            id="address"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="operatingHours"
            label="operatingHours"
            type="operatingHours"
            id="operatingHours"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="website"
            label="website"
            type="website"
            id="website"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="serviceFee"
            label="serviceFee"
            type="serviceFee"
            id="serviceFee"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="foodType"
            label="foodType"
            type="foodType"
            id="foodType"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="allergyInfo"
            label="allergyInfo"
            type="allergyInfo"
            id="allergyInfo"
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
          <Grid container></Grid>
        </form>
      </div>
    </Container>
  );
}
