import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AllNotifications.css'

const InsertNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${apiUrl}notification/new-event`, {
          method: 'GET',
          headers: {
            'token': token,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch notifications: ${response.status}`);
        }

        const data = await response.json();
        setNotifications(data.eventNewNotifications);
        if(!(notifications.length===0)){
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  },); 

  const handleIsRead = async (id) => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    try {
      await fetch(`${apiUrl}notification/isReadById`, {
        method: 'POST',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationId: id }),
      });
    } catch (error) {
      console.error('Error marking notification as read:', error.message);
    }
  };

  return (
    <div className="px-4 py-5 my-5 text-center">
    <div className="col-lg-6 mx-auto" id='allNotificationsSecondDiv'>
      <h1 className="display-5 fw-bold text-body-emphasis">New Events Notifications</h1>

      {loading ? (
        <div
        class="alert alert-danger"
        role="alert"
        id="allNotificationsNoticketsDiv"
      >
        <p id="allNotificationsNoTicketsPara">No notifications</p>
      </div>
      ) : (
        <div id='allNotificationsNotificationDiv'>
          {notifications.map((notification, index) => (
            <div key={index}>
              {notification.isRead ? (
                <div className="alert alert-secondary" role="alert" id='allNotificationsParagraph'>
                  <p>{notification.message}</p>
                </div>
              ) : (
                <div className="alert alert-info" role="alert" id='allNotificationsParagraph'>
                      <p style={{fontSize:'x-large', color:'black', marginTop:'5px', marginBottom:'20px'}}>{notification.message}</p>
                        <p style={{fontSize:'x-large', color:'black', marginTop:'5px', marginBottom:'20px'}}>Event ID: {notification.eventId}</p>
                      <p style={{fontSize:'x-large', color:'black', marginTop:'5px', marginBottom:'20px'}}>Date: {new Date(notification.createdAt).toLocaleString()}</p>
                      <Link to={`/attendee/event/${notification.eventId}`}>
                        <button className='btn btn-outline-primary' style={{marginTop:'20px', marginRight:'20px'}}>View Event</button>
                      </Link>
                      <button  type="button" className="btn btn-outline-success" style={{marginTop:'20px'}} onClick={() => handleIsRead(notification._id)}>
                        Mark as Read
                      </button>
                    </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  );
};

export default InsertNotifications;
