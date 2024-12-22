import React from 'react';
import { Link } from 'react-router-dom';
//import '../style/Profile.css'; // Add the path to your CSS file here

const Profile = () => (
  <div className="container profile-page">
    <div style={{width: "800px"}} className="card text-center">
      <div className="card-header">
        <h2 style={{fontSize: "xx-large", color: "black"}}>Profile</h2>
      </div>
      <div className="card-body d-flex flex-column justify-content-center">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link to="/vendor/myprofile">My Profile</Link>
          </li>
          <li className="list-group-item">
            <Link to="/vendor/services">My Services</Link>
          </li>
          <li className="list-group-item">
            <Link to="/vendor/bookings">My Bookings</Link>
          </li>
          <li className="list-group-item">
            <Link to="/vendor/bids">My Bids</Link>
          </li>
          <li className="list-group-item">
            <Link to="/vendor/feedback">My Feedback</Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Profile;
