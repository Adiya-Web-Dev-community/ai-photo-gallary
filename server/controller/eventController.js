const DashBoard = require("../models/dashboard");
const Event = require("../models/event");
const User = require("../models/user");
const { eventConfirmation } = require("../helpers/emailHelper.js");
const QRCode = require("qrcode");

// Get all events
const getEvents = async (req, res) => {
    try {
        const user = await User.findById(req.accountId);

        const status = req.query.status;
        const query = {
            dashboardId: user.dashboardId,
            isSubEvents: false,
        };

        if (status !== "") {
            query.status = status;
        }

        const events = await Event.find(query).populate({
            path: "subEvents",
            populate: {
                path: "subEvents",
            },
        });

        return res.status(200).json({
            message: "Events fetched successfully",
            success: true,
            data: events,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
        });
    }
};

// Get a single event
const getEvent = async (req, res) => {
    try {
        const user = await User.findById(req.accountId);

        const event = await Event.findById(req.params.id).populate({
            path: "subEvents",
            populate: {
                path: "subEvents",
            },
        });

        return res.status(200).json({
            message: "Event fetched successfully",
            success: true,
            data: event,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
        });
    }
};

// To add an event
const addEvent = async (req, res) => {
    try {
        const userid = req.accountId;
        const user = await User.findById(userid).populate({
            path: "dashboardId",
        });

        const event = await Event.create({
            ...req.body,
            dashboardId: user.dashboardId,
        });
        let link = `http://localhost:5173/${user.dashboardId.companyName}/event/${event._id}`;

        event.link = link;
        const qrCode = await QRCode.toDataURL(link);

        event.qrCode = qrCode;
        await event.save();
        eventConfirmation(
            event.eventHost.email,
            event.eventHost.name,
            event.name,
            event.qrCode,
            event.link
        );

        return res.status(200).json({
            message: "Event added successfully",
            success: true,
            event,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to add event",
            success: false,
        });
    }
};

// Create a sub events for a event

const addSubEvent = async (req, res) => {
    try {
        const userid = req.accountId;
        const user = await User.findById(userid); /*.populate({
            path: "dashboardId"
        })*/
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }
        const event = await Event.findById(req.params.id);
        const subEvent = await Event.create({
            ...req.body,
            isSubEvents: true,
            dashboardId: user.dashboardId,
            parentEvent: req.params.id,
        });
        event.subEvents.push(subEvent);
        await event.save();
        return res.status(200).json({
            message: "Sub event added successfully",
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to add sub event",
            success: false,
        });
    }
};

// To update an event
const updateEvent = async (req, res) => {
    try {
        const userid = req.accountId;
        const user = await User.findById(userid);

        const event = await Event.findByIdAndUpdate(
            req.params.eventId,
            {
                ...req.body,
            },
            {
                new: true,
            }
        );
        return res.status(200).json({
            message: "Event updated successfully",
            success: true,
            data: event,
        });
    } catch (error) {
        return res.status(500).json({
            console: error.message,
            message: "Failed to update event",
            success: false,
        });
    }
};

// To delete an event
const deleteEvent = async (req, res) => {
    try {
        const userid = req.accountId;
        const user = await User.findById(userid);
        const dashboard = await DashBoard.findById(user.dashboardId);
        if (req.params.eventId in dashboard.events) {
            const event = await Event.findByIdAndDelete(req.params.eventId);
            dashboard.events.splice(req.params.eventId, 1);
            return res.status(200).json({
                message: "Event deleted successfully",
                success: true,
                data: event,
            });
        }
        return res.status(404).json({
            message: "Event not found",
            success: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete event",
            success: false,
        });
    }
};

// To get a sub event {passing sub event id}
const getSubEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({
                message: "Event not found",
            });
        }
        return res.status(200).json({
            message: "Event fetched successfully",
            success: true,
            data: event,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
        });
    }
};

// To delete a sub event {passing sub event id}
const deleteSubEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({
                message: "Event not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Event deleted successfully",
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
        });
    }
};

const addYoutubeLinks = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { videoLinks } = req.body;

        if (
            !Array.isArray(videoLinks) ||
            videoLinks.some((video) => !video.title || !video.link)
        ) {
            return res.status(400).json({ message: "Invalid videoLinks data" });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        event.videoLinks = event.videoLinks.concat(videoLinks);

        await event.save();

        return res
            .status(200)
            .json({ message: "YouTube links added successfully", data: event });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteYoutubeLinks = async (req, res) => {
    try {
        const eventId = req.params.id;
        const linkId = req.params.linkId;
    
        const event = await Event.findById(eventId);
    
        if (!event) {
          return res.status(404).json({ message: "Event not found" });
        }
    
        event.videoLinks = event.videoLinks.filter(
          (video) => video._id.toString() !== linkId
        );
    
        await event.save();
    
        return res.status(200).json({
          message: "YouTube link deleted successfully",
          data: event,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
};

const getYoutubeLinks = async (req, res) => {
    try {
        const eventId = req.params.id;
        console.log(eventId);
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        return res.status(200).json({ data: event.videoLinks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateYoutubeLinks = async (req, res) => {
    try {
        const eventId = req.params.id;
        const linkId = req.params.linkId;
        const updatedFields = req.body; 
        console.log('Received updatedFields:', updatedFields);

    
        const event = await Event.findById(eventId);
    
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }
    
        const linkIndex = event.videoLinks.findIndex(link => link._id.toString() === linkId);
    
        if (linkIndex === -1) {
          return res.status(404).json({ message: 'YouTube link not found' });
        }
    
        const updatedLink = { ...event.videoLinks[linkIndex], ...updatedFields };
        event.videoLinks[linkIndex] = updatedLink;
    
        await event.save();
    
        return res.status(200).json({ message: 'YouTube link updated successfully', data: event });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
}


const addImages = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { imagesArray } = req.body;

        if (
            !Array.isArray(imagesArray) ||
            imagesArray.some((image) => typeof image !== "string")
        ) {
            return res
                .status(400)
                .json({ message: "Invalid imagesArray data" });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        event.imagesArray = event.imagesArray.concat(imagesArray);

        await event.save();

        return res
            .status(200)
            .json({ message: "Images added successfully", data: event });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteImages = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { imageUrls } = req.body;

        if (
            !Array.isArray(imageUrls) ||
            imageUrls.some((url) => typeof url !== "string")
        ) {
            return res.status(400).json({ message: "Invalid imageUrls data" });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        event.imagesArray = event.imagesArray.filter(
            (image) => !imageUrls.includes(image)
        );

        await event.save();

        return res
            .status(200)
            .json({ message: "Images deleted successfully", data: event });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getImagesArray = async (req, res) => {
    try {

        const eventId = req.params.id;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        return res.status(200).json({ imagesArray: event.imagesArray });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
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
    getImagesArray


};
