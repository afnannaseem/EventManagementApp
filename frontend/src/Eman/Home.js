import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'
const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to My Blog App</h1>
      <div className="button-container">
        <Link to="/register" className="action-button">Register</Link>
        <Link to="/login" className="action-button">Login</Link>
      </div>
    </div>
  );
};

export default Home;
