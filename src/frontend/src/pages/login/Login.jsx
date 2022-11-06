import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Link, Navigate } from "react-router-dom";
import authApi from '../../api/authApi';
import * as authActions from "../../store/auth/actions";
import "./Login.css";

function Login() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.error);
  const loading = useSelector(state => state.auth.loading);
  const user = useSelector(state => state.auth.user);

  async function handleSubmit(event) {
    dispatch(authActions.setError(""));

    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity()) {
      try {
        dispatch(authActions.setLoading(true));
        const data = await authApi.login({ username, password });

        dispatch(authActions.setUser(data?.user));
        dispatch(authActions.setToken(data?.authorization?.token));
      } catch (error) {
        if (error.response) {
          dispatch(authActions.setError(error.response.data.message));
        } else {
          dispatch(authActions.setError(error?.message));
        }
      } finally {
        dispatch(authActions.setLoading(false));
      }
    }

    setValidated(true);
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <div className="login-box text-start">
        <h3>Login</h3>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" required onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <Button variant="primary" type="submit" disabled={loading}>
            {loading && <Spinner size="sm" animation="border" />}
            {!loading && "Submit"}
          </Button>
        </Form>
        <p className="my-4 text-end">
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;