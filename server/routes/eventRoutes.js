const express = require("express");
const router = express.Router();

const middleware = require("../middleware/account");

const {
  getEvents,
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent,
  addSubEvent,
  getSubEvent,
  deleteSubEvent,
} = require("../controller/eventController");

// Get all events
router.get("/events", middleware, getEvents);

// Get a single event
router.get("/event/:id", getEvent);

// Create an event
router.post("/event", middleware, addEvent);

// Create a sub event
router.post("/subevent/:id", middleware, addSubEvent);

// Update a event
router.put("/subevent/:id", middleware, updateEvent);

// Get a subevent
router.get("/subevent/:id", middleware, getSubEvent);

// Delete a subevent
router.delete("/subevent/:id", middleware, deleteSubEvent);

// // Fetech all sub events
// router.get("/subevents/:id", middleware, getAllSubEvents)

// Delete a event
router.delete("/event/:id", deleteEvent);

module.exports = router;
