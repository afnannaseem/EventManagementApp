const express = require("express");
const router = express.Router();
const authenticateUser = require("../Authentication/Authentication");
const {
  createEvent,
  getEvents,
  getApprovedEvents,
  approveEvent,
  getTopEvents,
  rejectEvent,
  getspecificEvent,
  findTopEventOrganizers,
  getEventCustomer,
  removeEvent,
} = require("../Controller/event");
router.post("/createEvent", authenticateUser, createEvent);
router.get("/getApprovedEvents", authenticateUser, getApprovedEvents);
router.get("/getEvents", authenticateUser, getEvents);
router.post("/removeEvent", removeEvent);
router.put("/approveEvent", authenticateUser, approveEvent);
router.put("/rejectEvent", authenticateUser, rejectEvent);
router.get("/getTopEvents", getTopEvents);
router.get("/getspecificEvent/:id", authenticateUser, getspecificEvent);
router.get("/getCustomer/:id", authenticateUser, getEventCustomer);
router.get("/getTopEventOrganizers", authenticateUser, findTopEventOrganizers);
module.exports = router;
