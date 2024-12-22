import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/TicketDetails.css";
import { useNavigate } from 'react-router-dom';

const TicketDetails = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [ticketType, setTicketType] = useState("regular");
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${apiUrl}ticket/${ticketId}`, {
          method: "GET",
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Error fetching ticket details: ${response.statusText}`
          );
        }

        const data = await response.json();
        setTicket(data.ticket);
        setEvent(data.event);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [ticketId, flag]);

  const handleCancelTicket = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}ticket/cancel/${ticketId}`, {
        method: "POST",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setError(data.message);
      setTimeout(() => {
        navigate('/attendee/tickets')
      }, 2000);
    } catch (error) {
      console.error("Error canceling ticket:", error.message);
    }
  };
  const handleUpdateTicket = async () => {
    setShowUpdateForm(true);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    try {
      const response = await fetch(`${apiUrl}ticket/update/${ticketId}`, {
        method: "PUT",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketType,
        }),
      });
      const data = await response.json();
      setError(data.message);
      setFlag(!flag);
    } catch (error) {
      console.error("Error updating ticket", error.message);
    }
  };

  return (
    <div className="px-4 py-5 my-5 text-center">
      {loading ? (
        <p id="ticketDetailLoading">Loading ticket details...</p>
      ) : (
        <div className="col-lg-6 mx-auto" id="ticketDetailMainDiv">
          <h1 className="display-5 fw-bold text-body-emphasis">
            Ticket Details
          </h1>

          <div id="ticketDetailSecondDiv">
            <p style={{fontSize:'x-large', color:'black', marginTop:'5px', marginBottom:'20px'}} >Ticket ID: {ticket._id}</p>
            <p style={{fontSize:'x-large', color:'black', marginTop:'5px', marginBottom:'20px'}} >Event Name: {event.eventName}</p>
            <p style={{fontSize:'x-large', color:'black', marginTop:'5px', marginBottom:'20px'}} >Type: {ticket.type}</p>
            <p style={{fontSize:'x-large', color:'black', marginTop:'5px', marginBottom:'20px'}} >Price: {ticket.price}</p>
            <p style={{fontSize:'x-large', color:'black', marginTop:'5px', marginBottom:'20px'}} >
              Purchase Date: {new Date(ticket.purchaseDate).toLocaleString()}
            </p>
            {error && (
              <div className="alert alert-info" role="alert">
                <p id="ticketDetailErrorPargraph">{error}</p>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setError(null)}
                >X</button>
              </div>
            )}
            <button
              id="ticketDetailCancelTicketButton"
              onClick={handleCancelTicket}
              className="btn btn-danger"
            >
              Cancel Ticket
            </button>
            <button
              id="ticketDetailUpdateTicketButton"
              onClick={handleUpdateTicket}
              className="btn btn-primary"
            >
              Update Ticket
            </button>

            {showUpdateForm && (
              <div id="ticketDetailUpdateFormDiv">
                <label htmlFor="ticketType">Ticket Type:</label>
                <select
                  id="ticketType"
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                  className="form-select"
                >
                  <option value="regular">Regular</option>
                  <option value="vip">VIP</option>
                </select>

                <button
                  id="ticketDetailUpdateFormSubmitButton"
                  onClick={handleSubmit}
                  className="btn btn-success"
                >
                  Submit
                </button>
                <button
                  id="ticketDetailUpdateFormCloseButton"
                  onClick={() => setShowUpdateForm(false)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
