import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import CelebrationIcon from '@mui/icons-material/Celebration';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    
    // Redirect to the login page
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#f2bb97', fontFamily: 'Nunito, sans-serif' }}>
      <div className="container-fluid">
        <div className="d-flex justify-content-between w-100">
          <Link className="nav-link" to="/vendor/profile">
            <PersonIcon />
          </Link>

          <Link className="navbar-brand mx-auto" to="/vendor">
            <CelebrationIcon />
            <span style={{ marginLeft: '5px' }}>OEMS</span>
            <HomeIcon />
          </Link>

          <div className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <LogoutIcon />
          </div>
        </div>      
      </div>
    </nav>
  );
};

export default NavBar;
