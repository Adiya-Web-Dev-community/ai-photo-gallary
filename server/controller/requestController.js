const Event = require("../models/event");

const saveImageRequest = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }
    if (event.pinRequired === true) {
      if (event.pin === req.body.pin) {
        const request = {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          status: "pending",
        };

        event.eventAccessUsers.push(request);
        await event.save();
        return res.status(200).json({
          message: "Request added successfully",
          success: true,
        });
      } else {
        return res.status(404).json({
          message: "Invalid pin",
          success: false,
        });
      }
    }
    const request = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      status: "pending",
    };

    event.eventAccessUsers.push(request);
    await event.save();
    return res.status(200).json({
      message: "Request added successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add request",
      success: false,
    });
  }
};

const addImageForFaceRec = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }

    const email = req.body.email;
    console.log(email);

    const requestIndex = event.eventAccessUsers.findIndex(
      (user) => user.email === email
    );

    if (requestIndex === -1) {
      return res.status(404).json({
        message: "Request not found",
        success: false,
      });
    }

    // Update faceData for the specific request
    event.eventAccessUsers[requestIndex].faceData = req.body.faceData;

    await event.save();

    return res.status(200).json({
      message: "Face data added successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

const getRequests = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Requests fetched successfully",
      success: true,
      data: event.eventAccessUsers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch requests",
      success: false,
    });
  }
};

const processRequest = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }
    const request = event.eventAccessUsers.find(
      (request) => request._id == req.params.requestId
    );
    request.status = req.body.status;
    await event.save();
    return res.status(200).json({
      message: "Request processed successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to process request",
      success: false,
    });
  }
};

const addImagesRequest = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }
    const request = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      status: "pending",
      sharedImagesArray: req.body.sharedImagesArray,
    };
    event.eventImagesByUsers.push(request);
    await event.save();
    return res.status(200).json({
      message: "Request added successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add request",
      success: false,
    });
  }
};

const getImagesByUserRequest = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }
    const request = event.eventImagesByUsers.find(
      (request) => request._id == req.params.requestId
    );
    return res.status(200).json({
      message: "Request fetched successfully",
      success: true,
      data: request,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch request",
      success: false,
    });
  }
};

// Fetch all eventImagesByUsers
const getEventsImagesByUsersRequest = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Request fetched successfully",
      success: true,
      data: event.eventImagesByUsers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch request",
      success: false,
    });
  }
};

// Process eventImagesByUser
const processImagesRequest = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }
    const request = event.eventImagesByUsers.find(
      (request) => request._id == req.params.requestId
    );
    request.status = req.body.status;
    await event.save();
    return res.status(200).json({
      message: "Request processed successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to process request",
      success: false,
    });
  }
};

const getEventDetails = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }
    if (!event.isPublic) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }
    if (event.isPrivate && event.sharedLink == "") {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    return res.status(200).json({
      message: "Event fetched successfully",
      success: true,
      data: {
        eventName: event.eventName,
        eventId: event._id,
        sharedLink: event.sharedLink,
        pinRequired: event.pinRequired,
        faceSearch: event.faceSearch,
        fullEventAccess: event.fullEventAccess,
        coverImage: event.coverImage,
        description: event.description,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
const eventType = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }
    if (!event.isPublic) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Event security Check",
      success: true,
      pinRequired: event.pinRequired,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

const validatePin = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }
    if (event.pin === req.body.pin) {
      return res.status(200).json({
        message: "Event security Check successful",
        success: true,
      });
    } else {
      return res.status(404).json({
        message: "Event security Check failed",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

module.exports = {
  saveImageRequest,
  getRequests,
  processRequest,
  addImagesRequest,
  getImagesByUserRequest,
  getEventsImagesByUsersRequest,
  processImagesRequest,
  getEventDetails,
  eventType,
  validatePin,
  addImageForFaceRec,
};
