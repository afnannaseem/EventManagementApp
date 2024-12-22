const User = require("../Models/user");
const Ticket = require("../Models/ticketSchema");
const jwt = require("jsonwebtoken");
const Attendee = require("../Models/attendeeSchema");
const Event = require("../Models/event");
const createEvent = async (req, res) => {
  const {
    eventName,
    eventType,
    dateTime,
    venue,
    maxTicketsRegular,
    maxTicketsVip,
    RegTicketsSold,
    VipTicketsSold,
    priceOfVipTicket,
    priceOfRegularTicket,
    ticketAvailability,
    pic,
    approve,
    servicesType,
    organizerEmail,
    status,
    feedbackAndRatings,
    title,
    description,
    schedule,
    attendeeList,
    eventUpdates,
    totalrevenue,
  } = req.body;

  try {
    const event = await Event.create({
      eventName,
      eventType,
      dateTime,
      venue,
      maxTicketsRegular,
      maxTicketsVip,
      RegTicketsSold,
      VipTicketsSold,
      priceOfVipTicket,
      priceOfRegularTicket,
      ticketAvailability,
      pic,
      servicesType,
      title,
      description,
      organizerEmail,
      feedbackAndRatings,
      schedule,
      attendeeList,
      eventUpdates,
      totalrevenue,
    });

    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ approve: false });
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
const getApprovedEvents = async (req, res) => {
  try {
    const events = await Event.find({ approve: true });
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
const removeEvent = async (req, res) => {
  try {
    const { id } = req.body;
    const event = await Event.findOneAndRemove({ _id: id });
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
const approveEvent = async (req, res) => {
  try {
    const { id } = req.body;
    const event = await Event.findOneAndUpdate({ _id: id }, { approve: true });
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
const rejectEvent = async (req, res) => {
  try {
    const { id } = req.body;
    const event = await Event.findByIdAndRemove({ _id: id });
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
const getTopEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "upcoming" })
      .sort({ rating: -1 })
      .limit(10);
    console.log(events);
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
const getspecificEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findById({ _id: id });
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
const getEventCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const ticket = await Ticket.find({ eventId: id });
    const data = [];
    for (let i = 0; i < ticket.length; i++) {
      const attendee = await Attendee.findById({ _id: ticket[i].attendeeId });
      const user = await User.findOne({ email: attendee.email });
      data.push({
        name: attendee.name,
        email: attendee.email,
        type: ticket[i].type,
        pic: user.pic,
      });
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
const findTopEventOrganizers = async (req, res) => {
  try {
    const eventList = await Event.find({ approve: true });
    const organizerCounts = {};
    eventList.forEach((event) => {
      const organizerEmail = event.organizerEmail;
      organizerCounts[organizerEmail] =
        (organizerCounts[organizerEmail] || 0) + 1;
    });
    const sortedCounts = Object.entries(organizerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    const topOrganizers = sortedCounts.map(([email, count]) => ({
      email,
      count,
    }));
    const data = [];
    for (let i = 0; i < 4; i++) {
      const user = await User.findOne({ email: topOrganizers[i].email });
      console.log(user);
      data.push({
        name: user?.name,
        email: user?.email,
        pic: user?.pic,
        count: topOrganizers[i].count,
      });
    }
    console.log(data);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
module.exports = {
  createEvent,
  getEvents,
  getApprovedEvents,
  findTopEventOrganizers,
  findTopEventOrganizers,
  removeEvent,
  approveEvent,
  rejectEvent,
  getTopEvents,
  getspecificEvent,
  getEventCustomer,
};
