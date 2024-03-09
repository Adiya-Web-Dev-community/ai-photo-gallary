import './allEventContainer.css'
import EventCard from "../event-card/eventCard";

const AllEventContainer = ({ allEvents, eventRendering }) => {
    console.log("AllEventContainer => ", allEvents)
    return (
        <>
            {
                <div className='home-event-card-container' >
                    {allEvents?.map((event) => {
                        return <EventCard event={event} key={event._id} />
                    })}
                </div>
            //     : eventRendering == 'publishedEvents' ?
            //         <div className='home-event-card-container'>
            //             {allEvents?.map((event) => {
            //                 return event.published ? <EventCard event={event} key={event._id} /> : null
            //             })}
            //         </div>
            //         : eventRendering == 'unpublishedEvents' ?
            //             <div className='home-event-card-container'>
            //                 {allEvents?.map((event) => {
            //                     return !event.published ? <EventCard event={event} key={event._id} /> : null
            //                 })}
            //             </div>
            //             : null
            // }
            }
        </>
    )
}

export default AllEventContainer;