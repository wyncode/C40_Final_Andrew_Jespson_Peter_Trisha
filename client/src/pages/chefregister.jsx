import React, { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import swal from 'sweetalert';

const ChefRegister = ({ history }) => {
  const [formData, setFormData] = useState(null);

  const { setCurrentUser } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSignUp = async (e) => {
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
    <Container className="container d-flex flex-column align-items-center justify-content-center fullscreen">
      <h1>Register</h1>
      <Form style={{ width: 300 }} onSubmit={handleSignUp}>
        <Form.Group>
          <Form.Label htmlFor="email">fullname</Form.Label>
          <Form.Control
            id="fullname"
            type="fullname"
            placeholder="fullname"
            name="fullname"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="email">Email Address</Form.Label>
          <Form.Control
            id="email"
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">role</Form.Label>
          <Form.Control
            id="role"
            type="role"
            name="role"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">phoneNumber</Form.Label>
          <Form.Control
            id="phoneNumber"
            type="phoneNumber"
            placeholder="phoneNumber"
            name="phoneNumber"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Address</Form.Label>
          <Form.Control
            id="street"
            type="street"
            placeholder="Street"
            name="street"
            onChange={handleChange}
          />
          <Form.Control
            id="city"
            type="city"
            placeholder="city"
            name="city"
            onChange={handleChange}
          />
          <Form.Control
            id="state"
            type="state"
            placeholder="state"
            name="state"
            onChange={handleChange}
          />
          <Form.Control
            id="zip"
            type="zip"
            placeholder="zipcode"
            name="zip"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Date of Birth</Form.Label>
          <Form.Control
            id="dateOfBirth"
            type="dateOfBirth"
            placeholder="date Of Birth"
            name="dateOfBirth"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <Button type="submit">Register</Button>
        </Form.Group>
      </Form>
      <Link className="mt-4" to="/welcome">
        Have an account? Login.
      </Link>
    </Container>
  );
};

export default ChefRegister;
