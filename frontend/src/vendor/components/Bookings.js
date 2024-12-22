import React, { useState, useEffect } from 'react';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    const apiUrl = "http://localhost:3002/";

    try {
      const response = await fetch(`${apiUrl}booking/`, {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching bookings: ${response.statusText}`);
      }

      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    const token = localStorage.getItem('token');
    const apiUrl = "http://localhost:3002/";
    const route = newStatus === 'confirmed' ? 'accept' : 'reject';

    try {
      const response = await fetch(`${apiUrl}booking/${route}/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json(); // Fetch the detailed error message from response
      throw new Error(errorData.message || `Error updating booking status: ${response.statusText}`);
    }

      await fetchBookings(); // Refresh the bookings list
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container booking-list-page">
      <div style={{width: "700px"}} className="card">
        <div className="card-header text-center">
          <h1 style={{fontSize: "xx-large", color: "black"}}>Booking List</h1>
        </div>
        <div className="card-body text-center">
          {loading ? (
            <p>Loading bookings...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <ul className="list-group">
              {bookings.map(booking => (
                <li key={booking.bookingId} className="list-group-item">
                  <p>Event Name: {booking.eventName}</p>
                  <p>Date of Event: {new Date(booking.eventDate).toLocaleDateString()}</p>
                  <p>Service: {booking.serviceName}</p>
                  <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                  <p>Status: {booking.status}</p>
                  {booking.status === 'pending' && (
                    <div>
                      <button className="btn btn-success" onClick={() => updateBookingStatus(booking.bookingId, 'confirmed')}>Accept</button>
                      <button className="btn btn-danger" onClick={() => updateBookingStatus(booking.bookingId, 'cancelled')}>Reject</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingList;
