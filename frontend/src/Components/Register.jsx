import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import './Css/Register.css';
import logo from './assets/logo.png';

const REGISTER_USER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [formError, setFormError] = useState(null); // State for form errors

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setFormError(null); // Clear previous errors when changing input
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Client-side validation
    if (!formData.username || !formData.email || !formData.password) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      const { data } = await registerUser({ variables: formData });
      if (data && data.register) {
        alert('Registration successful! Please log in.');
        navigate('/login'); // Navigate to login page
      }
    } catch (err) {
      console.error('Registration error:', err);
      setFormError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Twitter logo" className="twitter-logo" />
      <h3>Sign up for Twitter</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <span>Signing Up...</span>
              <div className="loading-spinner"></div>
            </>
          ) : (
            'Sign Up'
          )}
        </button>
        {formError && <p className="error-message">{formError}</p>}
      </form>
      {error && <p className="error-message">Error: {error.message}</p>}
      <div className="register">
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
