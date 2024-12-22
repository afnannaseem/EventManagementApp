import React, { useState, useEffect } from 'react';

const FeedbacksList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseText, setResponseText] = useState({});

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    const token = localStorage.getItem('token');
    const apiUrl = "http://localhost:3002/";

    try {
      const response = await fetch(`${apiUrl}feedback/`, {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching feedbacks: ${response.statusText}`);
      }

      const data = await response.json();
      setFeedbacks(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleResponse = async (feedbackId) => {
    const token = localStorage.getItem('token');
    const apiUrl = "http://localhost:3002/";
    const text = responseText[feedbackId];

    try {
      const response = await fetch(`${apiUrl}feedback/respond/${feedbackId}`, {
        method: 'POST',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response: { text } }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error responding to feedback: ${response.statusText}`);
      }

      await fetchFeedbacks(); // Refresh the feedbacks list
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e, feedbackId) => {
    setResponseText({ ...responseText, [feedbackId]: e.target.value });
  };

  return (
    <div className="container feedbacks-list-page">
      <div style={{width: "700px"}} className="card">
        <div className="card-header text-center">
          <h1 style={{fontSize: "xx-large", color: "black"}}>Feedback List</h1>
        </div>
        <div className="card-body">
          {loading ? (
            <p>Loading feedbacks...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <ul className="list-group">
              {feedbacks.map(feedback => (
                <li key={feedback.feedbackId} className="list-group-item">
                  <p>Event Name: {feedback.eventName}</p>
                  <p>Rating: {feedback.rating}</p>
                  <p>Comment: {feedback.comment}</p>
                  <p>Response: {feedback.response ? feedback.response.text : 'No response yet'}</p>
                  {feedback.response && feedback.response.text === "" && (
                    <div>
                      <input type="text" value={responseText[feedback.feedbackId] || ''} onChange={(e) => handleChange(e, feedback.feedbackId)} placeholder="Your response" className="form-control" />
                      <button className="btn btn-primary mt-2" onClick={() => handleResponse(feedback.feedbackId)}>Submit Response</button>
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

export default FeedbacksList;
