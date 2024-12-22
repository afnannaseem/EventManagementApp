import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import "../styles/MyProfile.css";

const MyProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [bookedEventsSummary, setBookedEventsSummary] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    fetch(`${apiUrl}attendee/profile`, {
      method: "GET",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching profile: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setProfileData(data))
      .catch((error) => console.error(error.message));

    // Fetch booked events summary
    fetch(`${apiUrl}attendee/bookedEvents`, {
      method: "GET",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error fetching booked events: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => setBookedEventsSummary(data))
      .catch((error) => console.error(error.message));
  }, []);

  const handleUpdate = async () => {
    setShowUpdateForm(true);
  };

  const handleSubmit = async () => {
    if (!name || !email) {
      setError("Enter the details");
      return;
    }
    const token = localStorage.getItem("token");
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    try {
      const response = await fetch(`${apiUrl}attendee/profile`, {
        method: "PUT",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json();
      setError(data.message);
      if (data.message === "Profile Updated Successfully") {
        setShowUpdateForm(false);
        setTimeout(() => {
          localStorage.removeItem("token");
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
    }
  };

  return (
    <div className="container my-profile px-4 py-2" id="myProfileMainDiv">
      <p className="mt-4" style={{fontSize:'xx-large', color:'black'}}>My Profile <PersonIcon fontSize="large"/></p>
      <div className="row mt-4" style={{ paddingLeft: "10px" }} id='myProfileSecondDiv'>
        <div className="col-md-3" id="myProfilePersonalInfoDiv">
          <p id="myProfileMargin">Personal Info</p>
          {profileData ? (
            <div>
              <p class="myProfilePersonalInfoParagraph">
                Name: {profileData.name}
              </p>
              <p class="myProfilePersonalInfoParagraph">
                Email: {profileData.email}
              </p>
              <button style={{marginTop:'20px', marginBottom:'10px'}} onClick={handleUpdate} className="btn btn-primary">
                Update Your Profile
              </button>
              {showUpdateForm && (
                <div className="mb-3">
                  <h3 id="myProfileMargin">Update Profile</h3>
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                  />
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                  <button
                    style={{marginTop:'20px', marginBottom:'10px'}}
                    onClick={handleSubmit}
                    className="btn btn-success"
                  >
                    Submit
                  </button>
                </div>
              )}
              {error && (
                <div
                  id="myProfileErrorDiv"
                  className="alert alert-info"
                  role="alert"
                >
                  <p>{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="btn-close"
                  ></button>
                </div>
              )}
            </div>
          ) : (
            <div
              class="spinner-border p-2"
              id="myProfileSpinnerDiv"
              role="status"
            ></div>
          )}
        </div>
        <div className="col-md-9">
          <p id="myProfileBookedEventsHeading">Booked Events</p>
          {bookedEventsSummary ? (
            <div>
              <ul>
                {bookedEventsSummary.map((event) => (
                  <div
                    className="card text-center"
                    id="myProfileBookedEventsMainDiv"
                  >
                    <div
                      className="card-header"
                      id="myProfileBookedEventsHeaderDiv"
                    >
                      <p style={{fontSize:'x-large', color:'black'}}>Event Name: {event.eventName}</p>
                    </div>
                    <div
                      className="card-body"
                      id="myProfileBookedEventsBodyDiv"
                    >
                      <p style={{fontSize:'x-large', color:'black', marginTop:'5px', marginBottom:'20px'}} >Regular Tickets: {event.regularTickets}</p>
                      <p style={{fontSize:'x-large', color:'black', marginTop:'5px', marginBottom:'20px'}} >VIP Tickets: {event.vipTickets}</p>
                      <p style={{fontSize:'x-large', color:'black', marginTop:'5px', marginBottom:'20px'}} >Total Tickets: {event.totalTickets}</p>
                      <Link
                        to={`/attendee/event/${event.eventId}`}
                        className="btn btn-primary"
                      >
                        View Event
                      </Link>
                    </div>
                    <div
                      className="card-footer text-body-secondary"
                      id="myProfileBookedEventsFooterDiv"
                    >
                      <p>EMS</p>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <div
              class="alert alert-danger"
              role="alert"
              id="myProfileNoBookedEventsDiv"
            >
              <p id="myProfileLoadingBookedEvents">No bookings yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
