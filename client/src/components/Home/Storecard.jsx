import React from 'react';
import { Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
//styling in material UI

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

const StoreCard = ({ store }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div
      onClick={() => history.push(`/stores/${store._id}`)}
      style={{ cursor: 'pointer', width: '100vw' }}
    >
      <Grid container direction="column" justify="center" alignItems="center">
        <Card className={classes.root} style={{ width: '100%' }}>
          <CardHeader title={store.chefName} subheader={store.foodType} />
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="p">
              {store.bio}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {store.priceRange}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};
export default StoreCard;
