// Login.js
import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Import useNavigate correctly
import ProtectedRoute from '../ProtectedRoute';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};
    let isValid = true;

    if (!validateEmail(email)) {
      isValid = false;
      newErrors.email = 'Please enter a valid email address.';
    }

    if (password.length < 8) {
      isValid = false;
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        const response = await axios.post('http://vmi835174.contaboserver.net:9090/dtbox/api/v1/admin/login', { username: email, password:password });
        setMessage(response.data.message);
        setEmail('');
        setPassword('');
        localStorage.setItem('token', response.data.access_token);
      } catch (error) {
        setMessage(error.response?.data?.message || 'An error occurred.');
      }
    }
 
  };
  if (ProtectedRoute()) {
    return <Navigate to="/"/>
  } 
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
          }}
          required
        />
        {errors.email && <div className="error" style={{ color: 'red' }}>{errors.email}</div>}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
          }}
          required
        />
        {errors.password && <div className="error" style={{ color: 'red' }}>{errors.password}</div>}

        <button type="submit">Login</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Login;
