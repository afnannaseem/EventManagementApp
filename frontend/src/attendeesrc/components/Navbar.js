import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import "../styles/NavBar.css";

const NavBar = () => (
  <nav className="navbar navbar-expand-lg " id="nav">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/attendee">
        <EventIcon />
        <span style={{ fontFamily: "Nunito, sans-serif", marginLeft: "5px" }}>
          EMS
        </span>
      </Link>
      <Link className="nav-link" aria-current="page" to="/attendee" style={{color:'black'}}>
        <HomeIcon />
      </Link>
      <Link className="nav-link" aria-current="page" to="/attendee/profile" style={{color:'black'}}>
        <PersonIcon />
      </Link>
      <Link className="nav-link" to="/attendee/logout" style={{color:'black'}}>
        <LogoutIcon />
      </Link>
    </div>
  </nav>
);

export default NavBar;
