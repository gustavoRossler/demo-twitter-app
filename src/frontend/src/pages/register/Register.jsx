import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Link, Navigate } from "react-router-dom";
import usersApi from '../../api/usersApi';
import "./Register.css";

function Register() {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const user = useSelector(state => state?.auth?.user);

  async function handleSubmit(event) {
    setError("");
    setMessage("");
    setValidated(false);

    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity()) {
      try {
        setLoading(true);
        const data = await usersApi.createUser({ name, email, username, password });
        setName("");
        setUsername("");
        setPassword("");
        setEmail("");
        setMessage("User registered successfully");
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError(error?.message);
        }
      } finally {
        setLoading(false);
      }
    } else {
      setValidated(true);
    }
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="register-container">
      <div className="register-box text-start">
        <h3>Register</h3>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" required value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" required value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          {message && <p className="text-success">{message}</p>}
          <Button variant="primary" type="submit" disabled={loading}>
            {loading && <Spinner size="sm" animation="border" />}
            {!loading && "Submit"}
          </Button>
        </Form>
        <p className='my-4'>
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;