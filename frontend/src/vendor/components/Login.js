import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear the error message when the user starts typing
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log('User logged in successfully');
        localStorage.setItem('token', data.token);
        // Navigate to the main page or the protected route
        navigate('/vendor/home');
      } else {
        console.error('Login failed:', data.error);
        setErrorMessage(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage(null)}>Close</button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
