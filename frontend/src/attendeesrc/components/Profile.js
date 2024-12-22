import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Profile.css'
const Profile = () => (
  <div className="px-4 py-5 my-5 text-center">
    <div className="col-lg-6 mx-auto"  id='profileSecondDiv'>
      <h1 className="display-5 fw-bold text-body-emphasis">Profile</h1>
      
      <ul id='profileUnorderedList'>
        <li id='profileListElements'>
          <Link to="/attendee/myprofile"  id='profileLinks'>
            <p id='profileParagraphs'>My Profile</p>
          </Link>
        </li>
        <li id='profileListElements'>
          <Link to="/attendee/tickets" id='profileLinks'>
            <p id='profileParagraphs'>My Tickets</p>
          </Link>
        </li>
        <li id='profileListElements'>
          <Link to="/attendee/notifications"  id='profileLinks'>
            <p id='profileParagraphs'>My Notifications</p>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Profile;