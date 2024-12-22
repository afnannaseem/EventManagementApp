import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/EventTile.css'

const EventTile = ({ event }) => {
  const { eventName, eventType, dateTime, venue} = event;

  return (
    <div className="card text-center" id='eventTileMainDiv'>
      <div className="card-header" id='eventTileHeaderDiv'>
          <p style={{fontSize:'xx-large', color:'black'}} >Event Name: {eventName}</p>
      </div>
      <div className="card-body" id='eventTileBodyDiv'>
        <p style={{fontSize:'x-large', color:'black', marginTop:'5px', marginBottom:'20px'}} className="card-text">Type: {eventType}</p>
        <p style={{fontSize:'x-large', color:'black', marginBottom:'20px'}} className="card-text">Date: {new Date(dateTime).toLocaleString()}</p>
        <p style={{fontSize:'x-large', color:'black',marginBottom:'20px' }} className="card-text">Venue: {venue}</p>
        <Link to={`/attendee/event/${event._id}`} className="btn btn-primary">
          View
        </Link>
      </div>
      <div className="card-footer text-body-secondary" id='eventTileFooterDiv'>
        Posted at EMS
      </div>
    </div>
  );
};

export default EventTile;
