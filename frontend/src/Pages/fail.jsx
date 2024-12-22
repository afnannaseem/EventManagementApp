import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
const Fail = () => {
    const navigate = useNavigate();

    const redirectHomePage = () => {
        navigate('/', { replace: true });
    }
    return (
        <div className="failure-container">
            <div className="failure-circle">
                <div className="failure-icon">&#10006;</div>
            </div>
            <div className="failure-text-heading">Payment Failed</div>
            <div className="failure-text-description">
                Oops! Something went wrong with your payment.
            </div>
            <div className="failure-link">
                <p onClick={redirectHomePage}>Go to Home</p>
            </div>
        </div>
    );
}
export default Fail;