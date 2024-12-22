// UpdateEventPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateEventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventType: '',
    dateTime: '',
    venue: '',
    maxTicketsRegular: 0,
    maxTicketsVip: 0,
    priceOfRegularTicket: 0,
    priceOfVipTicket: 0,
    servicesType: [],
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/event/events/${eventId}`, {
          headers: {
            token: localStorage.getItem('token'),
          },
        });

        setEventDetails(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error.message);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    try {
      // Assuming your backend route for updating event details is correct
      const response = await axios.put(`http://localhost:8080/event/events/${eventId}`, eventDetails, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });

      // Redirect to the event details page after successful update
      navigate(`/details/${response.data._id}`);
    } catch (error) {
      console.error('Error updating event:', error.message);
    }
  };

  return (
    <div>
      <nav className='navbar'>Update Event</nav>
      <div style={{ marginTop:'20px',display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginBottom:'30px' }}>

      <form onSubmit={handleUpdateEvent}>
        {/* Add input fields for each property */}
        <label>
          Event Name:
          <input type="text" name="eventName" value={eventDetails.eventName} onChange={handleInputChange} />
        </label>
        <label>
          Event Type:
          <input type="text" name="eventType" value={eventDetails.eventType} onChange={handleInputChange} />
        </label>
        <label>
         Date Time:
        <input type="text" name="dateTime" value={eventDetails.dateTime} onChange={handleInputChange} />
        </label>
        <label>
          Venue:
          <input type="text" name="Venue" value={eventDetails.venue} onChange={handleInputChange} />
        </label>
        {/* Repeat the above label/input pattern for other properties */}
        <button2 type="submit">Update Event</button2>
      </form>
    </div>
    </div>
  );
};

export default UpdateEventPage;
