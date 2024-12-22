import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
export default function Block() {
    return (
        <div className="blocked-container">
            <div className="blocked-icon">&#128683;</div>
            <div className="blocked-message">
                Sorry, your account is blocked. Please contact support.
            </div>
            <Link to="/home" className="support-button">
                Back to Home
            </Link>
        </div>
    )
}