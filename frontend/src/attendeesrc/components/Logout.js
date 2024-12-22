import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Logout.css'

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="px-4 py-5 my-5 text-center">
      <div className="col-lg-6 mx-auto" id='logoutSecondDiv'>
        <h1 className="display-5 fw-bold text-body-emphasis">Logout</h1>
        <button onClick={handleLogout} className="btn btn-danger" style={{ marginTop: '20px' }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutButton;
