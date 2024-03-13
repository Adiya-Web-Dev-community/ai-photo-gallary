import { useState } from 'react';
import './FullEventForm.css';
import axios from '../../../helpers/axios';
import { useNavigate, useParams } from 'react-router-dom';

const FullEventForm = () => {
  //   const { eventId } = useParams();
  const [eventData, setEventData] = useState({ fullAccess: false });
  const [pin, setPin] = useState('');
  const navigate  = useNavigate() 
  const {eventId} = useParams()
  // //fetch event details
  // const fetchEventDetails = async () => {
  //   const resp = await axios.get(`/events/${eventId}`);
  //   //save event details in state => eventData
  //   // check if full access to the event is given
  // };

  //handle PIN check
  const checkPinValidation = () => {
    navigate(`/show-event-data/${eventId}`)
  };

  return eventData?.fullAccess ? (
    <div className="pirvate-container">
      <h1>This Event is Private</h1>
      <h2>Cannot Access this Event without Admin's Permission</h2>
      <h3>Thank you</h3>
    </div>
  ) : (
    <div className="event-access-container">
      <h1>EVENT NAME</h1>
      <form className="event-form">
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
          <button onClick={checkPinValidation} className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FullEventForm;
