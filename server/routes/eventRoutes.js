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
  addYoutubeLinks,
  getYoutubeLinks,
  updateYoutubeLinks,
  deleteYoutubeLinks,
  addImages,
  deleteImages,
  getImagesArray,
  addWatermarkInImages,
  getClientImagesArray,
  pinValidate,
  getClientYoutubeLinks,
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
router.put("/event/:id", middleware, updateEvent);

// Get a subevent
router.get("/subevent/:id", middleware, getSubEvent);

// Delete a subevent
router.delete("/subevent/:id", middleware, deleteSubEvent);

// // Fetech all sub events
// router.get("/subevents/:id", middleware, getAllSubEvents)

// Delete a event
router.delete("/event/:id", deleteEvent);


// Update youtube links 
router.put("/event/:id/youtube-links/:linkId", middleware, updateYoutubeLinks);

// Add youtube links
router.post("/event/:id/youtube-links", middleware, addYoutubeLinks);

// Get youtube links
router.get("/event/:id/youtube-links", middleware, getYoutubeLinks);

// Delete youtube links
router.delete("/event/:id/youtube-links/:linkId", middleware, deleteYoutubeLinks);

router.get("/event/:id/event-images", middleware, getImagesArray);

router.post("/event/:id/event-images", middleware, addImages);

router.put("/event/:id/event-images/add-watermark", middleware, addWatermarkInImages);

router.delete("/event/:id/event-images", middleware, deleteImages);



// Client side apis
router.post("/:eventName/event-access/:id",pinValidate)

router.get("/event/images/show-all/:id",getClientImagesArray)

router.get("/event/videos/show-all/:id", getClientYoutubeLinks)


module.exports = router;

