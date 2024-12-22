import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Block from "./Component/Block";
import Event from "./Component/Event";
import AddEvent from "./Eman/AddEvent";
import EventDetails from "./Eman/EventDetails";
import EventList from "./Eman/EventList";
import Homee from "./Eman/Home";
import LoginForm from "./Eman/LoginForm";
import RegistrationForm from "./Eman/RegistrationForm";
import UpdateProfilePage from "./Eman/UpdateProfilePage";
import UpdateEvent from "./Eman/updateEvent";
import { ProvideAuth } from "./Hooks/AuthContext";
import Accept from "./Pages/Accept";
import Dashboard from "./Pages/Dashboard";
import Pending from "./Pages/Pending";
import Fail from "./Pages/fail";
import Home from "./Pages/home";
import Success from "./Pages/success";
import AliApp from "./attendeesrc/App";
import VendorApp from "./vendor/App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById("root"));
// const socket = io("http://localhost:3330");
// socket.on("newNotification", (data) => {
//   console.log("New Notification:", data);
// });
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProvideAuth>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/fail" element={<Fail />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<h1>Not Found</h1>} />
            <Route path="/home" element={<Home />} />
            <Route path="/pending" element={<Pending />} />
            <Route path="/accept" element={<Accept />} />
            <Route path="/block" element={<Block />} />
            <Route path="/event/:id" element={<Event />} />
            <Route path="/h" element={<Homee />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/event" element={<EventList />} />
            <Route path="/eventt" element={<EventList />} />
            <Route path="/details/:eventId" element={<EventDetails />} />
            <Route path="/update-profile" element={<UpdateProfilePage />} />
            <Route path="/update-event/:eventId" element={<UpdateEvent />} />
            <Route path="/add-event" element={<AddEvent />} />
            <Route path="/attendee/*" element={<AliApp />} />
            <Route path="/vendor/*" element={<VendorApp />} />
          </Routes>
        </BrowserRouter>
      </ProvideAuth>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
