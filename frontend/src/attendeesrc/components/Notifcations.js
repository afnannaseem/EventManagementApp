import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Notifications.css'

const Notifications = () => (
  <div className="px-4 py-5 my-5 text-center">
  <div className="col-lg-6 mx-auto" id='notificationsSecondDiv'>
    <h1 className="display-5 fw-bold text-body-emphasis">Notifications</h1>

    
      <ul id='notificationsUnorderedList'>
        <li id='notificationsListElements'>
          <Link to="/attendee/updatenotifications" id='notificationsLinks'>
            <p id='notificationsParagraphs'>Event Updates</p>
          </Link>
        </li>
        <li id='notificationsListElements'>
          <Link to="/attendee/cancellationnotifications" id='notificationsLinks'>
            <p id='notificationsParagraphs'>Event Cancellations</p>
          </Link>
        </li>
        <li id='notificationsListElements'>
          <Link to="/attendee/insertionnotifications" id='notificationsLinks'>
            <p id='notificationsParagraphs'>New Events</p>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Notifications;
