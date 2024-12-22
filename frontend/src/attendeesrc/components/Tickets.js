import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Tickets.css";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${apiUrl}ticket/`, {
          method: "GET",
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching tickets: ${response.statusText}`);
        }

        const data = await response.json();
        setTickets(data);
        if(!(tickets.length===0)){
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [tickets]);

  return (
    <div className="px-4 py-5 my-5 text-center">
      <div className="col-lg-6 mx-auto" id="ticketsSecondDiv">
        <h1 className="display-5 fw-bold text-body-emphasis">Ticket List</h1>

        {loading ? (
          <div
            class="alert alert-danger"
            role="alert"
            id="ticketsNoBookedTicketsDiv"
          >
            <p id="ticketsNoBookedTickets">No bookings yet</p>
          </div>
        ) : !tickets ? (
          <div
            class="alert alert-danger"
            role="alert"
            id="ticketsNoBookedTicketsDiv"
          >
            <p id="ticketsNoBookedTickets">No bookings yet</p>
          </div>
        ) : (
          <ul id="ticketsUnorderedList">
            {tickets.map((ticket) => (
              <div
                id="ticketsTicketIdDiv"
                className="alert alert-info"
                role="alert"
              >
                <li key={ticket._id} id="ticketsListElements">
                  <p id="ticketsParagraphs">Ticket ID: {ticket._id}</p>
                  <p id="ticketsParagraphs">
                    {" "}
                    {new Date(ticket.purchaseDate).toLocaleString()}
                  </p>
                  <Link
                    to={`/attendee/ticket/${ticket._id}`}
                    id="ticketsLinks"
                    className="btn btn-primary"
                    style={{marginTop:'25px'}}
                  >
                    See Ticket
                  </Link>
                </li>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TicketList;
