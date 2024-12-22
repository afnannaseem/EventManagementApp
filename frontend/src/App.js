import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import GoogleButton from "react-google-button";
import "./App.css";
//import sendRequest from "./Api Call/apiCalls";
import { Link } from "react-router-dom";
import { useAuth } from "./Hooks/AuthContext";

import logo from "./logo.svg";
function App() {
  const { googleSignIn } = useAuth() || {};
  const handleClick = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  const makePayment = async () => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_SECRET_KEY);
    const body = {
      products: [
        {
          id: "prod_J1Z4X2jZ1Z4X2j",
          quantity: 2,
          price: 300,
        },
      ],
    };
    const headers = {
      "Content-Type": "application/json",
    };
    console.log(process.env.REACT_APP_STRIPE_ROUTE);
    const response = await fetch(process.env.REACT_APP_STRIPE_ROUTE, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    console.log(result);
    if (result.error) {
      console.log(result.error.message);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <GoogleButton style={{ marginTop: 20 }} onClick={handleClick} />
        <GoogleButton
          style={{ marginTop: 20 }}
          title="Make Payement"
          onClick={makePayment}
        />
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Email"
            error
            style={{ marginTop: 20 }}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            error
            style={{ marginTop: 20 }}
            variant="outlined"
          />
        </Box>
      </header>
    </div>
  );
}

export default App;
