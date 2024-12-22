// EventDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [ticketStatus, setTicketStatus] = useState(null);
  const [attendees, setAttendees] = useState(null);
  const [bids, setBids] = useState([]); // New state for bids
  const [serviceType, setServiceType] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState(''); 
  const tokenn = localStorage.getItem('token');
  const [attendeeCount, setAttendeeCount] = useState(null);
  const [searchName, setSearchName] = useState(''); // State for search name
  const [matchingAttendees, setMatchingAttendees] = useState(null); // State for matching attendees
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedFunctionality, setSelectedFunctionality] = useState(null);
  const [feedbackAndRatings, setFeedbackAndRatings] = useState(null);
  const [ticketInfo, setTicketInfo] = useState({
    maxTicketsRegular: '',
    maxTicketsVip: '',
    priceOfRegularTicket: '',
    priceOfVipTicket: '',
  });

  // Inside EventDetails.js
  useEffect(()=>{
  const fetchAttendeeCount = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/event/attendees/${eventId}`, {
        headers: {
          token: tokenn,
        },
      });
      setAttendeeCount(response.data.attendeeCount);
    } catch (error) {
      console.error('Error fetching attendee count:', error.message);
    }
  };

  fetchAttendeeCount();
}, [eventId, tokenn]);

  const fetchTotalRevenue = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/event/events/${eventId}/calculateRevenue`, {
        headers: {
          token: tokenn,
        },
      });

      // Assuming the response has a property named 'totalRevenue'
      setTotalRevenue(Number(response.data.totalRevenue));
    } catch (error) {
      console.error('Error fetching total revenue:', error.message);
    }
  };

  
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/event/events/${eventId}`, {
          headers: {
            token: tokenn,
          },
        });

        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error.message);
      }
    };

    fetchEventDetails();
  }, [eventId]);
  
  if (!event) {
    return <div>Loading...</div>;
  }
  const handleButtonClick = (functionality) => {
    setSelectedFunctionality(functionality);
  };
  const handleManageTickets = async (event) => {
    // Show the form for managing tickets
    setTicketInfo({
      maxTicketsRegular: event.maxTicketsRegular,
      maxTicketsVip: event.maxTicketsVip,
      priceOfRegularTicket: event.priceOfRegularTicket,
      priceOfVipTicket: event.priceOfVipTicket,
    });

    setShowTicketForm(true);
  };
  const handleUpdateEventClick = () => {
    navigate(`/update-event/${eventId}`);
  };
  const handleSubmitTicketInfo = async () => {
    try {
      // Assuming your backend route for updating ticket info is correct
      const response = await axios.put(`http://localhost:8080/event/events/${event._id}/updateTicketInfo`, ticketInfo,{
        headers: { token: tokenn },
      });

      // Handle the response or update the state as needed
      console.log('Tickets managed successfully:', response.data);

      // Reset the state and hide the form
      setTicketInfo({
        maxTicketsRegular: '',
        maxTicketsVip: '',
        priceOfRegularTicket: '',
        priceOfVipTicket: '',
      });
      setShowTicketForm(false);

      // You can add additional logic here, such as updating the state or showing a success message
    } catch (error) {
      console.error('Error managing tickets:', error.message);
      // Handle the error, show an error message, or redirect as needed
    }
  };
  const handleShowTotalRevenue = () => {
    // Fetch total revenue when the button is clicked
    fetchTotalRevenue();
  };
  const handleSeeTicketStatus = async (eventId) => {
    try {
      // Assuming your backend route for updating ticket counts is correct
      const response = await axios.post(`http://localhost:8080/event/events/${eventId}/updateTicketCounts`, {}, { headers: { token: tokenn } });

      // Extract ticket status details from the response
      const { maxTicketsRegular, maxTicketsVip, regularTicketsSold, vipTicketsSold, ticketAvailability } = response.data.Event;

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
      console.error('Error fetching ticket status:', error.message);
    }
  };
  
  const handleSeeAttendees = async (eventId) => {
    try {
      // Assuming your backend route for fetching attendees is correct
      const response = await axios.get(`http://localhost:8080/event/events/${eventId}/attendees`, {
        headers: { token: tokenn },
      });

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
      console.error('Error fetching attendees:', error.message);
    }
  };
  const handleViewBids = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/event/events/${eventId}/bids`, {
        headers: { token: tokenn },
        params: {
          serviceType: selectedServiceType, // Use the selectedServiceType state
        },
      });

      setBids(response.data);
    } catch (error) {
      console.error('Error fetching bids:', error.message);
    }
  };
  const handleDecision = async (bidId, decision) => {
    try {
      // Make a PUT request to acceptOrRejectBid route
      const response = await axios.put(`http://localhost:8080/event/bids/${bidId}/decision`,
       {
        decision,
      },{ headers: { token: tokenn },});

      // Update the bids state with the updated bid
      setBids((prevBids) =>
        prevBids.map((bid) => (bid._id === bidId ? response.data : bid))
      );
    } catch (error) {
      console.error('Error updating bid decision:', error.message);
    }
  };
  const handleDeleteBid = async (bidId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/event/bids/${bidId}`, {
        headers: 
          { token: tokenn }
        
      });

      // Update the bids state by removing the deleted bid
      setBids((prevBids) => prevBids.filter((bid) => bid._id !== bidId));
    } catch (error) {
      console.error('Error deleting bid:', error.message);
    }
  };
  const handleLogoutClick = () => {
    // Perform any additional logout logic if needed
    localStorage.removeItem('token');

    // Redirect to the home page or login page after logout
    navigate('/h');
  };
  const handleSearchAttendee = async () => {
    try {
      // Assuming your backend route for searching attendees is correct
      const response = await axios.get(`http://localhost:8080/event/events/${eventId}/attendees/search`, {
        headers: { token: tokenn },
        params: {
          name: searchName,
        },
      });
      
      setMatchingAttendees((prevMatchingAttendees) => {
        if (prevMatchingAttendees) {
          // If search results are already visible, hide them
          return null;
        } else {
          // If search results are not visible, show them
          return response.data.matchingAttendees;
        }
      });
    } catch (error) {
      console.error('Error searching attendees:', error.message);
    }
  };
  const handleUpdateProfileClick = () => {
    // Redirect to the update profile page
    navigate('/update-profile');
  };
  const handleFileChange = (e) => {
    // Update the file state when a file is selected
    setFile(e.target.files[0]);
  };
  const handleDeleteOrCancelEvent = async (eventId) => {
    try {
      // Assuming your backend route for deleting or canceling events is correct
      const response = await axios.delete(`http://localhost:8080/event/events/${eventId}`, {
        headers: {
          token: tokenn,
        },
      });

      // Check the response for the success message or handle accordingly
      console.log(response.data.message);

      // You may want to perform additional actions after deleting or canceling the event
    } catch (error) {
      console.error('Error deleting or canceling event:', error.message);
    }
  };
  const handleFetchFeedbackAndRatings = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/event/events/${eventId}/feedbackAndRatings`, {
        headers: {
          token: tokenn,
        },
      });

      setFeedbackAndRatings(response.data);
    } catch (error) {
      console.error('Error fetching feedback and ratings:', error.message);
    }
  };
  // const handleImageUpload = async () => {
  //   try {
  //     // Create a FormData object to send the file
  //     const formData = new FormData();
  //     formData.append('image', file);

  //     // Use axios to send a POST request to the backend for image upload
  //     const response = await axios.put(`http://localhost:8080/event/events/${eventId}/addPictures`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         token: tokenn,
  //       },
  //     });

  //     // Display success message or update the UI as needed
  //     console.log('Image uploaded successfully:', response.data);
  //   } catch (error) {
  //     console.error('Error uploading image:', error.message);
  //   }
  // };
  return (
    <div>
      {/* Add your buttons and their functionalities here */}
      <nav className="navbar">
        <button className="navbar button" onClick={handleLogoutClick}>Logout</button>
        <button className='navbar button' onClick={handleUpdateProfileClick}>Update Profile</button>
        <button className='navbar button' onClick={handleUpdateEventClick}>Update Event</button>
      </nav>
      <div style={{ marginTop:'100px',display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginBottom:'30px' }}>
      <div style={{marginTop:'100px',boxshadow:' 0 2px 4px rgba(0, 0, 0, 0.1)', border: '1px solid #ddd', padding: '20px', borderRadius: '10px', maxWidth: '600px', width: '100%',marginBottom:'30px' }}>
      <label>
          <button2  onClick={handleShowTotalRevenue}>Show Total Revenue</button2>
          {totalRevenue !== null && (
            <p>Total Revenue: {totalRevenue}</p>
          )}
        </label>

        <label>
          Service Type:
          <input
            type="text"
            value={selectedServiceType}
            onChange={(e) => setSelectedServiceType(e.target.value)}
          />
        </label>

        <button3 onClick={() => handleViewBids()}>View Bids</button3>
        {bids.length > 0 && (
          <div>
            <h3>Bids:</h3>
            <div className="bid-container">
              {bids.map((bid) => (
                <div key={bid._id} className="bid-box">
                  <p>Service Type: {bid.serviceType}</p>
                  <p>Bid Amount: {bid.bidAmount}</p>
                  <p>Description: {bid.message}</p>
                  <p>VendorId: {bid.vendorId}</p>
                  <button onClick={() => handleDecision(bid._id, 'accepted')}>Accept</button>
                  <button onClick={() => handleDecision(bid._id, 'rejected')}>Reject</button>
                  <button onClick={() => handleDeleteBid(bid._id)}>Delete Bid</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button3 onClick={() => handleManageTickets(event)}>Manage Tickets</button3>
        {showTicketForm && (
          <form onSubmit={(e) => { e.preventDefault(); handleSubmitTicketInfo(); }}>
            <label>
              Max Regular Tickets:
              <input
                type="number"
                value={ticketInfo.maxTicketsRegular}
                onChange={(e) => setTicketInfo({ ...ticketInfo, maxTicketsRegular: e.target.value })}
              />
            </label>

            <label>
              Max VIP Tickets:
              <input
                type="number"
                value={ticketInfo.maxTicketsVip}
                onChange={(e) => setTicketInfo({ ...ticketInfo, maxTicketsVip: e.target.value })}
              />
            </label>

            <label>
              Price of Regular Ticket:
              <input
                type="number"
                value={ticketInfo.priceOfRegularTicket}
                onChange={(e) => setTicketInfo({ ...ticketInfo, priceOfRegularTicket: e.target.value })}
              />
            </label>

            <label>
              Price of VIP Ticket:
              <input
                type="number"
                value={ticketInfo.priceOfVipTicket}
                onChange={(e) => setTicketInfo({ ...ticketInfo, priceOfVipTicket: e.target.value })}
              />
            </label>

            <button2 type="submit">Update Ticket Info</button2>
          </form>
        )}

        <button onClick={() => handleSeeTicketStatus(event._id)}>See Tickets Status</button>
        {ticketStatus && ticketStatus.eventId === event._id && (
          <div>
            <p>Max Regular Tickets: {ticketStatus.maxTicketsRegular}</p>
            <p>Max VIP Tickets: {ticketStatus.maxTicketsVip}</p>
            <p>Regular Tickets Sold: {ticketStatus.regularTicketsSold}</p>
            <p>VIP Tickets Sold: {ticketStatus.vipTicketsSold}</p>
            <p>Ticket Availability: {ticketStatus.ticketAvailability?.toString()}</p>
          </div>
        )}

       <br/> <label>
          Search Attendee:
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </label>

        <button onClick={handleSearchAttendee}>Search</button>
        {matchingAttendees && (
          <div>
            <p>Matching Attendees:</p>
            <ul>
              {matchingAttendees.map((attendee, index) => (
                <li key={index}>
                  {`Name: ${attendee}`}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button2 onClick={() => handleSeeAttendees(event._id)}>See Attendees</button2>
        {attendees && attendees.eventId === event._id && attendees.list && (
          <div>
            {attendeeCount !== null && (
              <p>Attendee Count: {attendeeCount}</p>
            )}
            <p>Attendees:</p>
            <ul>
              {attendees.list.map((attendee) => (
                <li key={attendee.attendeeId}>
                  {`Name: ${attendee.name}, Email: ${attendee.email}`}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button3 onClick={() => handleDeleteOrCancelEvent(event._id)}>Delete or Cancel Event</button3>
        <button onClick={handleFetchFeedbackAndRatings}>Fetch Feedback and Ratings</button>

{feedbackAndRatings && (
  <div>
    <h3>Feedback and Ratings:</h3>
    <p>Feedback: {feedbackAndRatings.feedback}</p>
    <p>Ratings: {feedbackAndRatings.ratings}</p>
  </div>
)}
      </div>
    </div>
  </div>
  );
};

export default EventDetails;
