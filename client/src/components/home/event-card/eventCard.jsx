import { useNavigate } from 'react-router-dom';
import './eventCard.css'


const EventCard = ({ event }) => {
    const navigate = useNavigate()
    return (
        <div className='home-event-card' onClick={() => {navigate(`/event-form-page/${event.eventName}/${event._id}`);}}>
            <section className='r1'>
                {event.eventName}
            </section>
            <section className='r2'>
                <img src={event.eventCoverPage} />
            </section>
            <section className='r3'>
                {event.eventDate}
            </section>
        </div>
    )
}

export default EventCard