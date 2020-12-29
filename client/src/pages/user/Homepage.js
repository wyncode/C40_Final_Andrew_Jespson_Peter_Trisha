import React from 'react';
import userNav from './usernav';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const DashHompage = () => {
  const history = useHistory();
  const { setCharities, setFavoriteChefs } = useContext(AppContext);

  //get order history endpoint
  const orderHistory = async () => {
    try {
      const response = await axios.get();
    } catch (error) {
      console.log(error);
    }
  };

  //get favorite chefs
  const getFavChefs = async () => {
    try {
      const response = await axios.get();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <userNav />
      <Button
        variant="success"
        size="lg"
        onClick={() => {
          history.push('/create-store');
        }}
      >
        Create a Store
      </Button>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Account</Card.Title>
          <Button variant="primary">Account info</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Store</Card.Title>
          <Button variant="primary">My Store</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Orders</Card.Title>
          <Card.Text>All my Appointments</Card.Text>
          <Button variant="primary" onClick={orderHistory}>
            Appointment History
          </Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Favorite Chefs</Card.Title>
          <Card.Text>All your Favorite chefs</Card.Text>
          <Button variant="primary" onClick={getFavChefs}>
            Favs
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashHompage;
