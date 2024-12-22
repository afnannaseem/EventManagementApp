import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EventBidDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [message, setMessage] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch event details
    const token = localStorage.getItem('token');
    const apiUrl = "http://localhost:3002/";
    fetch(`${apiUrl}search/event/${eventId}`, {
      headers: {
        'token': token,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error fetching event: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => setEvent(data))
    .catch(error => console.error('Error fetching event:', error.message));
  }, [eventId]);

  const handleBidSubmission = async () => {
    if (!selectedServiceType || !bidAmount.trim() || !message.trim()) {
      setSubmitStatus('Please fill all required fields.');
      return;
    }
    setConfirmSubmit(true);
  };

  const confirmAndSubmitBid = async () => {
    const token = localStorage.getItem('token');
    const apiUrl = "http://localhost:3002/";
    try {
      const response = await fetch(`${apiUrl}bidding/submit`, {
        method: 'POST',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId,
          serviceType: selectedServiceType,
          bidAmount,
          message,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error submitting bid');
      }
      setSubmitStatus('Bid submitted successfully');
      setTimeout(() => navigate('/vendor/bids'), 3000); // Redirect to bids page after 3 seconds
    } catch (error) {
      setSubmitStatus(error.message);
    }
  };

  return (
    <div className="container event-bid-detail">
      {event ? (
        <div style={{width: "700px"}} className="card">
          <div className="card-header text-center">
            <h1 style={{fontSize: "xx-large", color: "black"}}>{event.eventName}</h1>
          </div>
          <div className="card-body ">
          <div className="text-center mb-3">
            <p>Type: {event.eventType}</p>
            <p>Date: {new Date(event.dateTime).toLocaleString()}</p>
            <p>Venue: {event.venue}</p>
            <p>Services Available: {event.servicesType.join(', ')}</p>
            </div>
            <h2 style={{fontSize: "xx-large", color: "black"}} className="mt-4 text-center">Add Bid</h2>
            <div className="bid-form">
              <label htmlFor="serviceType">Service Type:</label>
              <select
                id="serviceType"
                value={selectedServiceType}
                onChange={e => setSelectedServiceType(e.target.value)}
                className="form-control"
              >
                <option value="">Select Service Type</option>
                {event.servicesType.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>

              <label htmlFor="bidAmount">Bid Amount:</label>
              <input
                type="number"
                id="bidAmount"
                placeholder="Bid Amount"
                value={bidAmount}
                onChange={e => setBidAmount(e.target.value)}
                className="form-control"
              />

              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                placeholder="Message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="form-control"
              ></textarea>

              <button onClick={handleBidSubmission} className="btn btn-primary mt-3">Submit Bid</button>
            </div>
          </div>

          {submitStatus && <div className="card-footer">{submitStatus}</div>}

          {confirmSubmit && (
            <div className="card-footer">
              <p>Are you sure you want to submit this bid? You cannot edit it later.</p>
              <button onClick={confirmAndSubmitBid} className="btn btn-success">Yes, Submit</button>
              <button onClick={() => setConfirmSubmit(false)} className="btn btn-danger">Cancel</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading event details...</p>
      )}
    </div>
  );
};

export default EventBidDetail;
