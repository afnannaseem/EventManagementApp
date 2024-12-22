import React from "react";
import { Route, Routes } from "react-router-dom";
import "./AttendeeApp.css";
import CancelNotifications from "./components/CancellationNotifications";
import EventDetail from "./components/EventDetail";
import Footer from "./components/Footer";
import HomePage from "./components/Home";
import InsertNotifications from "./components/InsertionNotifications";
import Login from "./components/Login";
import LogoutButton from "./components/Logout";
import MyProfile from "./components/MyProfile";
import NavBar from "./components/Navbar";
import Notifications from "./components/Notifcations";
import Profile from "./components/Profile";
import TicketDetails from "./components/TicketDetails";
import TicketList from "./components/Tickets";
import UpdateNotifications from "./components/UpdateNotifications";
const AliApp = () => {
  return (
    <div id="mainDiv">
      <NavBar />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="" element={<HomePage />} />
        <Route path="logout" element={<LogoutButton />} />
        <Route path="event/:eventId" element={<EventDetail />} />
        <Route path="profile" element={<Profile />} />
        <Route path="myprofile" element={<MyProfile />} />
        <Route path="tickets" element={<TicketList />} />
        <Route path="ticket/:ticketId" element={<TicketDetails />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="updatenotifications" element={<UpdateNotifications />} />
        <Route
          path="cancellationnotifications"
          element={<CancelNotifications />}
        />
        <Route
          path="insertionnotifications"
          element={<InsertNotifications />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default AliApp;
