import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'

const RegistrationForm = () => {
  console.log('Component is rendered');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role:'',
    signIn:'',
    contactInformation:'',
  });
  const [error, setError] = useState(null); // State for error message
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your backend registration endpoint
      const response = await axios.post('http://localhost:8080/org/register', formData);

      // Assuming the backend returns a token upon successful registration
      const token = response.data.token;

      // Store the token in localStorage or wherever you handle state management
      localStorage.setItem('token', token);

      // Redirect to the blog posts page or any other page you want
      navigate('/login');

    } catch (error) {
      // Handle registration failure, show an error message, etc.
      console.error('Registration failed', error.response.data);
      setError('Already registered');
    }
  };


  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <label>
          Role:
          <input type="role" name="role" value={formData.role} onChange={handleChange} />
        </label>
        <label>
          SignIn:
          <input type="signIn" name="signIn" value={formData.signIn} onChange={handleChange} />
        </label>
        <label>
          Contact:
          <input type="contactInformation" name="contactInformation" value={formData.contactInformation} onChange={handleChange} />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );

};

export default RegistrationForm;
