import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
const decodeJwt = (token) => {
  try {
    const [headerEncoded, payloadEncoded] = token.split(".");
    const header = JSON.parse(atob(headerEncoded));
    const payload = JSON.parse(atob(payloadEncoded));
    return { header, payload };
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // State for error message
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const storeToken = (token) => {
    localStorage.setItem("token", token);
  };
  const tokenn = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/org/login",
        formData,
        {
          headers: {
            token: tokenn,
          },
        }
      );

      // Check if the response has a 'data' property
      if (response.data && response.data.token) {
        // Decode the token manually
        const decodedToken = decodeJwt(tokenn);

        if (decodedToken) {
          console.log("Decoded Token Data:", decodedToken.payload);

          // Extract and set the user role
          const userRole = decodedToken.payload.role;
          const email = decodedToken.payload.email;
          console.log("User Role:", userRole);

          // Store the user role in local storage
          localStorage.setItem("userRole", userRole);
          localStorage.setItem("email", email);
        } else {
          console.log("Failed to decode token.");
        }
        storeToken(response.data.token);
        // Login successful, navigate to the blog list page or perform other actions
        console.log("Login successful", response.data);
        localStorage.setItem("token", response.data.token);
        console.log("Token:", tokenn);
        console.log(
          "Token stored in local storage:",
          localStorage.getItem("token")
        );

        navigate("/eventt");
      } else {
        // Handle login failure
        console.error("Login failed: Unexpected response", response);
        // Display an error message on the page or take other appropriate actions
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed", error.response?.data);
      // Display an error message on the page or take other appropriate actions
    }
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
