import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Import the CSS file

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [ticketStatus, setTicketStatus] = useState(null);
  const [attendees, setAttendees] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const tokenn = localStorage.getItem("token");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch events from the server
        const response = await axios.get("http://localhost:8080/event/events", {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            page: currentPage,
            pageSize: pageSize,
          },
        });
        console.log(response);
        // Set events state
        setEvents(response.data);
        setCurrentPage(response.data.page);
        setPageSize(response.data.pageSize);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching events:", error.message);
      }
    };

    fetchEvents();
  }, [currentPage, pageSize]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleLogoutClick = () => {
    // Perform any additional logout logic if needed
    localStorage.removeItem("token");

    // Redirect to the home page or login page after logout
    navigate("/h");
  };

  const handleSeeTicketStatus = async (eventId) => {
    try {
      // Assuming your backend route for updating ticket counts is correct
      const response = await axios.post(
        `http://localhost:8080/event/events/${eventId}/updateTicketCounts`,
        {},
        { headers: { token: tokenn } }
      );

      // Extract ticket status details from the response
      const {
        maxTicketsRegular,
        maxTicketsVip,
        regularTicketsSold,
        vipTicketsSold,
        ticketAvailability,
      } = response.data.Event;

      setTicketStatus((prevTicketStatus) => {
        if (!prevTicketStatus || prevTicketStatus.eventId !== eventId) {
          return {
            eventId,
            maxTicketsRegular,
            maxTicketsVip,
            regularTicketsSold,
            vipTicketsSold,
            ticketAvailability,
          };
        } else {
          // If the same eventId is clicked again, hide the information
          return null;
        }
      });
    } catch (error) {
      console.error("Error fetching ticket status:", error.message);
    }
  };
  const LogoutPage = ({ handleLogout }) => {
    const handleLogoutClick = () => {
      // Perform any additional logout logic if needed
      handleLogout();

      // Redirect to the home page or login page after logout
      navigate("/h");
    };
  };
  const handleUpdateProfileClick = () => {
    // Redirect to the update profile page
    navigate("/update-profile");
  };

  const handleSeeAttendees = async (eventId) => {
    try {
      // Assuming your backend route for fetching attendees is correct
      const response = await axios.get(
        `http://localhost:8080/event/events/${eventId}/attendees`,
        {
          headers: { token: tokenn },
        }
      );
      const attendees = response.data.map((attendee) => ({
        attendeeId: attendee.attendeeId,
        name: attendee.name,
        email: attendee.email,
      }));
      setAttendees((prevAttendees) => {
        if (!prevAttendees || prevAttendees.eventId !== eventId) {
          return {
            eventId,
            list: attendees,
          };
        } else {
          // If the same eventId is clicked again, hide the information
          return null;
        }
      });
    } catch (error) {
      console.error("Error fetching attendees:", error.message);
    }
  };

  const handleSearchEventsByName = () => {
    // Filter events based on search term
    const filteredEvents = events.filter((event) =>
      event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the state with the filtered events
    setEvents(filteredEvents);
  };
  const handleAddEventClick = () => {
    // Navigate to the "Add Event" page
    navigate("/add-event");
  };
  return (
    <div>
      <nav className="navbar">
        <button className="navbar button" onClick={handleLogoutClick}>
          Logout
        </button>
        <button className="navbar button" onClick={handleUpdateProfileClick}>
          Update Profile
        </button>
        <button className="navbar button" onClick={handleAddEventClick}>
          Add Event
        </button>
      </nav>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginBottom: "30px",
        }}
      >
        <div className="event-list-container">
          <ul>
            <label>
              Search Events by Name:
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
            <button onClick={handleSearchEventsByName}>Search</button>

            {events.map((event) => (
              <li
                key={event._id}
                className="event-item"
                onClick={() => navigate(`/details/${event._id}`)}
              >
                <h3>{event.eventName}</h3>
                <p>{event.eventType}</p>
                <p>{event.dateTime}</p>
                <p>{event.venue}</p>
                <p>{event.status}</p>
              </li>
            ))}
          </ul>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
