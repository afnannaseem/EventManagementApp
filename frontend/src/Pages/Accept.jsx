import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sendRequest from "../Api Call/apiCalls";
import "../App.css";
const Accept = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log(process.env.REACT_APP_Base_URL + "/RequestAcceptMessge")
        sendRequest(process.env.REACT_APP_Base_URL + "/RequestAcceptMessge", "Put", {})
        setTimeout(() => {
            navigate("/home")
        }, 3000);
    }, [navigate]);
    return (
        <div className="success-container">
            <div className="success-icons">&#10003;</div>
            <div className="success-message">
                Your request has been accepted successfully!
            </div>
        </div>
    );
};
export default Accept;