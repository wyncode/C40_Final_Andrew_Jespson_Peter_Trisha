/*import React, { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import swal from 'sweetalert';

const MealSetForm = () => {
  const [mealSet, setMealSet] = useState(null);
  const { setLoading } = useContext(AppContext);
  const handleChange = (e) => {
    setMealSet({ ...mealSet, [e.target.name]: e.target.value });
  };
  const handleMealSetSubmission = async (e) => {
    const form = e.target;
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios({
        method: 'POST',
        url: '/api/mealsets',
        withCredentials: true,
        data: 'mealSet'
      });
      swal('New mealset!', 'Your meal set has been added', 'success');
      setMealSet(null);
      setLoading(false);
      form.reset();
    } catch (error) {
      swal('Oops', 'Something went wrong');
    }
  };
  return (
    <Container>
      <Form onSubmit={handleMealSetSubmission}>
        <Form.Group>
          <Form.Label>Mealset Menu</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search for a mealset"
            name="meal set"
            onChange={handleMealSetSubmission}
            required
          />
        </Form.Group>
        {/* <Form.Group controlId=''>
          <Form.Label></Form.Label>
          <Form.Control
            type=''
            placeholder=''
            name=''
            onChange={handleChange}
            className=''
          />
        </Form.Group> <- we are revisiting this so not removing it yet
        <Form.Group controlId="">
          <Button type="submit">Add Meal Set</Button>
        </Form.Group>
      </Form>
    </Container>
  );
};
export default MealSetForm */
