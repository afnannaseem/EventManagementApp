import React, { useState, useEffect } from 'react';

const BidsList = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    const token = localStorage.getItem('token');
    const apiUrl = "http://localhost:3002/";

    try {
      const response = await fetch(`${apiUrl}bidding/`, {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching bids: ${response.statusText}`);
      }

      const data = await response.json();
      setBids(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const deleteBid = async (bidId) => {
    const token = localStorage.getItem('token');
    const apiUrl = "http://localhost:3002/";

    try {
      const response = await fetch(`${apiUrl}bidding/delete/${bidId}`, {
        method: 'DELETE',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error deleting bid: ${response.statusText}`);
      }

      // Refresh the list of bids after deletion
      await fetchBids();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container bids-list-page">
      <div style={{width: "700px"}} className="card">
        <div className="card-header text-center">
          <h1 style={{fontSize: "xx-large", color: "black"}}>Bid List</h1>
        </div>
        <div className="card-body text-center">
          {loading ? (
            <p>Loading bids...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <ul className="list-group">
              {bids.map(bid => (
                <li key={bid.bidId} className="list-group-item">
                  <p>Event Name: {bid.eventName}</p>
                  <p>Event Date: {new Date(bid.eventDate).toLocaleDateString()}</p>
                  <p>Service Type: {bid.serviceType}</p>
                  <p>Bid Amount: {bid.bidAmount}</p>
                  <p>Message: {bid.message}</p>
                  <p>Status: {bid.status}</p>
                  <p>Submitted Date: {new Date(bid.dateSubmitted).toLocaleDateString()}</p>
                  {bid.status === 'submitted' && (
                    <button className="btn btn-danger" onClick={() => deleteBid(bid.bidId)}>Delete</button>
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

export default BidsList;
