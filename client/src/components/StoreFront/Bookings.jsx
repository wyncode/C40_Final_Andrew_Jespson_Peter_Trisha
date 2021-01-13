import React, { useState, useEffect } from 'react';
import { Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';

const useStyles = makeStyles({
  storeContainer: {
    paddingTop: '20px'
  },
  cardStyle: {
    root: {
      maxWidth: 345
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    }
  }
});

const Bookings = ({}) => {
  const [bookings, setBookings] = useState(null);
  const classes = useStyles();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/bookings`)
      .then((res) => {
        console.log(res.data);
        setBookings(res.data);
        setReload(false);
      })
      .catch((e) => console.log(e));
  }, [reload, setReload, setBookings]);

  const handleClick = async (bookingId) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`);
      swal('You have cancelled your booking!');
      setReload(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {bookings?.map((booking) => {
        return (
          <div>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Card
                className={classes.root}
                style={{ width: '100%', margin: '10px' }}
              >
                <CardHeader
                  title={booking?.bookerName}
                  subheader={`${booking?.bookerPhone} | ${booking?.bookerEmail}`}
                />
                <CardContent>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    Service Fee: $ {booking?.serviceFee}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Total: $ {booking?.totalCost}
                  </Typography>
                </CardContent>
                <Button
                  onClick={() => {
                    handleClick(booking._id);
                  }}
                >
                  Reject Order
                </Button>
              </Card>
            </Grid>
          </div>
        );
      })}
    </>
  );
};

export default Bookings;
