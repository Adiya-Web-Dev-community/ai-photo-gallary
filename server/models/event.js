const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: { type: String },
  eventDate: { type: String },
  eventDescription: { type: String },
  eventCoverPage: { type: String },
  eventImages: [],
  eventVideoLinks: [],
  published: { type: Boolean, default: false },
  // reference: dashboard , client
});

const EventModel = mongoose.model("event", eventSchema);
module.exports = EventModel;
