import React from "react";
import "../App.css";
const Pending = () => {
    return (
        <div className="pending-container">
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
            <div className="pending-message">Your request is pending...</div>
        </div>
    );
};
export default Pending;