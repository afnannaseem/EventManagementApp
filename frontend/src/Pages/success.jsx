import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
const Success = () => {
    const navigate = useNavigate()
    function redirectHomePage() {
        navigate('/home', { replace: true })
    }
    return (
        <div className="container">
            <div className="circle">
                <div className="success-icon">&#10004;</div>
            </div>
            <div className="text-heading">Payment Successful!</div>
            <div className="text-description">
                Thank you for your purchase. Your payment was successful.
            </div>
            <div className="link">
                <Link onClick={redirectHomePage}>Go to Home</Link>
            </div>
        </div>
    )
};
export default Success;