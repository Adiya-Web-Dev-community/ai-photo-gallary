import { useEffect, useState } from "react";
import "./FullEventForm.css";
import axios from "../../../helpers/axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const FullEventForm = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  //fetch event details
  const fetchEventDetails = async (eventId) => {
    try {
      const resp = await axios.get(`/event/${eventId}`);
      console.log("data", resp.data.data);
      setEventData(resp.data.data);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const validatePin = async (e) => {
    e.preventDefault();
    console.log();
    try {
      const response = await axios.post(
        `/${eventData.eventName}/event-access/${eventId}`,
        pin
      );
      if (response.data.success) {
        // If PIN is valid, navigate to the show event data page
        navigate(`/show-event-data/${eventId}`);
      }
    } catch (error) {
      toast.error("Invalid PIN. Please try again.");
    }
  };

  useEffect(() => {
    fetchEventDetails(eventId);
  }, [eventId]);

  if (!eventData?.fullEventAccess) {
    return (
      <div
        className="private-container"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            fontSize: "1.7rem",
            fontWeight: "800",
            marginBottom: "1rem",
          }}
        >
          This Event is Private
        </h1>
        <h2
          style={{
            fontSize: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          Cannot Access this Event without Admin's Permission
        </h2>
        <h3
          style={{
            fontSize: "1.2rem",
          }}
        >
          Thank you
        </h3>
      </div>
    );
  }

  return (
    <div className="event-access-container">
      <h1
        style={{
          fontSize: "1.5rem",
          marginTop: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {eventData?.eventName}
      </h1>
      <form className="event-form" onSubmit={validatePin}>
        <div>
          <p>Please enter PIN to access this event.</p>
          <p>You can access images and videos for this event.</p>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Pin"
            name="pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="pin-input"
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FullEventForm;
