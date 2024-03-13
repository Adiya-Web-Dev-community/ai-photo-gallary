const express = require("express");
const router = express.Router();

const middleware = require("../middleware/account");

const {
  saveImageRequest,
  getRequests,
  processRequest,
  addImagesRequest,
  getImagesByUserRequest,
  getEventsImagesByUsersRequest,
  processImagesRequest,
  getEventDetails,
  addImageForFaceRec,
  //
  fullAccessValidatePin
} = require("../controller/requestController");

// Save Image Request
router.post("/event/request/:id", saveImageRequest);

// Upload Image Request
router.put("/event/request/:id", addImageForFaceRec);

// Get all requests
router.get("/event/:id", middleware, getRequests);

// Process request
router.put("/event/:id/request/:requestId", middleware, processRequest);

// Add images request
router.post("/event/add-images/:id", middleware, addImagesRequest);

// Get images by user request
router.get("/event/:id/request/:requestId", middleware, getImagesByUserRequest);

// Get events images by users request
router.get("/event/:id/images", middleware, getEventsImagesByUsersRequest);

// Process images request
router.put("/event/:id/images/:requestId", middleware, processImagesRequest);

// URL with pin
router.get("/:companyName/event/:id", getEventDetails);

module.exports = router;
