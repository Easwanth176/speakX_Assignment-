import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import './Css/Login.css';
import logo from './assets/logo.png';

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formError, setFormError] = useState(null); // State for form errors

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: data => {
      const token = data.login.token;
      localStorage.setItem('token', token);
      navigate('/home');
    },
    onError: error => {
      console.error('Error logging in:', error.message);
      setFormError('Invalid credentials. Please check your email and password.');
    }
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setFormError(null); // Clear previous errors when changing input
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Client-side validation
    if (!formData.email || !formData.password) {
      setFormError('Please fill in all fields.');
      return;
    }
    loginUser({ variables: formData });
  };

  return (
    <div className="container">
      <img src={logo} alt="logo" />
      <h3>Log in to Twitter</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
        {formError && <p className="error-message">{formError}</p>}
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">Error: {error.message}</p>}
      <div className="register">
        <p>Don't have an account? <Link to="/">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
