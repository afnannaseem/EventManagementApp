const express = require("express");
const router = express.Router();
const {
  createEvent,
  postFeedbackAndRatings,
  updateEventDetails,
  addpic,
  deleteOrCancelEvent,
  getAllEvents,
  updateTicketInfo,
  updateTicketCounts,
  calculateTotalRevenue,
  searchEvent,
  getAttendeesForEvent,
  getAttendeeCount,
  searchAttendeeInEvent,
  viewBidsForEvent,
  acceptOrRejectBid,
  deleteBid,
  getFeedbackAndRatings,
} = require("../Controller/EventController");
const  authenticateUser  = require("../Authentication/Authentication");
router.post("/events", authenticateUser, createEvent);
router.put("/events/:eventId", authenticateUser, updateEventDetails);
router.delete("/events/:eventId", authenticateUser, deleteOrCancelEvent);
router.get("/events/:eventId", authenticateUser, searchEvent);
router.get("/events", authenticateUser, getAllEvents);
router.post(
  "/events/:eventId/updateTicketCounts",
  authenticateUser,
  updateTicketCounts
);
router.get(
  "/events/:eventId/attendees",
  authenticateUser,
  getAttendeesForEvent
);
router.get("/attendees/:eventId", authenticateUser, getAttendeeCount);
router.get(
  "/events/:eventId/attendees/search",
  authenticateUser,
  searchAttendeeInEvent
);
router.get("/events/:eventId/bids", authenticateUser, viewBidsForEvent);
router.put("/bids/:bidId/decision", authenticateUser, acceptOrRejectBid);
router.delete("/bids/:bidId", authenticateUser, deleteBid);
router.put(
  "/events/:eventId/updateTicketInfo",
  authenticateUser,
  updateTicketInfo
);
router.get(
  "/events/:eventId/calculateRevenue",
  authenticateUser,
  calculateTotalRevenue
);
router.put("/events/:eventId/addPictures", authenticateUser, addpic);
router.get(
  "/events/:eventId/feedbackAndRatings",
  authenticateUser,
  getFeedbackAndRatings
);
router.post(
  "/events/:eventId/feedbackAndRatings",
  authenticateUser,
  postFeedbackAndRatings
);
module.exports = router;
