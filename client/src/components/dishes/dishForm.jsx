import React, { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import swal from 'sweetalert';
import Dish from '../server/db/models/dish';

const dishForm = () => {
  const [dish, setDish] = useState(null);
  const { setLoading } = useContext(AppContext);
  const handleChange = (e) => {
    setDish({ ...dish, [e.target.name]: e.target.value });
  };
  const handleDishSubmission = async (e) => {
    const form = e.target;
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios({
        method: 'POST',
        url: '/api/dish',
        withCredentials: true,
        data: Dish
      });
      swal('New Meal!', 'Your meal has been added', 'success');
      setDish(null);
      setLoading(false);
      form.reset();
    } catch (error) {
      swal('Oops', 'Something went wrong');
    }
  };
  return (
    <Container>
      <Form onSubmit={handleDishSubmission}>
        <Form.Group controlId="mealReservation">
          <Form.Label>Due Date</Form.Label>
        </Form.Group>
        <Form.Group controlId="">
          <Button type=""></Button>
        </Form.Group>
      </Form>
    </Container>
  );
};
export default dishForm;
