// AddEvent.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
    const [formData, setFormData] = useState({
        eventName: '',
        eventType: '',
        dateTime: '',
        venue: '',
        maxTicketsRegular: 0,
        maxTicketsVip: 0,
        priceOfRegularTicket: 0,
        priceOfVipTicket: 0,
        servicesType: [''], // Initialize with an empty service
      });
    

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    // Update the form data when input fields change
    if (e.target.name === 'servicesType') {
      const updatedServices = [...formData.servicesType];
      updatedServices[index] = e.target.value;
      setFormData({
        ...formData,
        servicesType: updatedServices,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to create a new event
      const response = await axios.post('http://localhost:8080/event/events', formData, {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      });

      // Redirect to the event list page after successful creation
      navigate('/eventt');
    } catch (error) {
      console.error('Error creating event:', error.message);
    }
  };
  const handleAddService = () => {
    // Add an empty service to the array
    setFormData({
      ...formData,
      servicesType: [...formData.servicesType, ''],
    });
  };

  const handleRemoveService = (index) => {
    // Remove the service at the specified index
    const updatedServices = [...formData.servicesType];
    updatedServices.splice(index, 1);
    setFormData({
      ...formData,
      servicesType: updatedServices,
    });
  };
  return (
    <div >
      <nav className='navbar'>Add Event</nav>
      <div style={{ marginTop:'100px',display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginBottom:'30px' }}>
      <form onSubmit={handleSubmit}>
        {/* Input fields for each attribute */}
        <label>
          Event Name:
          <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} />
        </label>
        <label>
          Event Type:
          <input type="text" name="eventType" value={formData.eventType} onChange={handleChange} />
        </label>
        <label>
  Date Time:
  <input type="text" name="dateTime" value={formData.dateTime} onChange={handleChange} />
</label>

        <label>
          Venue:
          <input type="text" name="venue" value={formData.venue} onChange={handleChange} />
        </label>
        <label>
          Max Tickets for Regular:
          <input type="text" name="maxTicketsRegular" value={formData.maxTicketsRegular} onChange={handleChange} />
        </label>
        <label>
          Max Tickets for Vip:
          <input type="text" name="maxTicketsVip" value={formData.maxTicketsVip} onChange={handleChange} />
        </label>
        <label>
          Price for Regular:
          <input type="text" name="priceOfRegularTicket" value={formData.priceOfRegularTicket} onChange={handleChange} />
        </label>
        <label>
          Price for Vip:
          <input type="text" name="priceOfVipTicket" value={formData.priceOfVipTicket} onChange={handleChange} />
        </label>
        {/* Repeat for other attributes */}
        {formData.servicesType.map((service, index) => (
          <div key={index}>
            <label>
              Service Type {index + 1}:
              <input
                type="text"
                name="servicesType"
                value={service}
                onChange={(e) => handleChange(e, index)}
              />
              <button type="button" onClick={() => handleRemoveService(index)}>
                Remove Service
              </button>
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddService}>
          Add Service
        </button>

        <button type="submit">Create Event</button>
      </form>
    </div>
    </div>
  );
};

export default AddEvent;
