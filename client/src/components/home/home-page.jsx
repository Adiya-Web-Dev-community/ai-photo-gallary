import './home-page.css'
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { BsCalendar4Event } from 'react-icons/bs';
import { Modal, Box } from "@mui/material";
import CreateEventPopup from './create-event/create-event-pop-up';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../helpers/axios'
import AllEventContainer from './event-card-container/allEventContainer';

const HomePage = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        bgcolor: "#ffff",
        borderRadius: "3px",
        boxShadow: 'inset 1px 1px 5px -1px rgba(0,0,0,0.5)',
        p: 4,
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [allEvents, setAllEvents] = useState();
    const [eventRendering, setEventRendering] = useState('')

    const getAllEvents = async () => {
        await axios.get(`/events?status=${eventRendering}`, {
            headers: {
                authorization: token
            }
        })
            .then((res) => {
                console.log("all events => ", res.data.
                data
                )
                setAllEvents(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        setAllEvents([])
        getAllEvents();
    }, [eventRendering])

    console.log(allEvents)
    return (
        <div className="home-page-container">
            <section className="home-page-header">
                <div className='home-page-header-lb'>
                    <button>
                        {/* <MdOutlineArrowBackIosNew /> */}
                    </button>
                    <button onClick={handleOpen}>
                        Create Event
                    </button>
                </div>
                <div className='home-page-header-rb'>
                    <button onClick={() => navigate('/dashboard-details')}>
                        <span><FiSettings /></span>
                        <span>Dashboard Settings</span>
                    </button>
                </div>
            </section>
            <main>
                <div className='home-page-main-button-container'>
                    <section>
                        <button
                            onClick={() => setEventRendering('')}
                            style={{ backgroundColor: eventRendering == 'allEvents' ? '#f0f0f0' : 'transparent' }}
                        >
                            SHOW ALL
                        </button>
                    </section>
                    <section>
                        <button
                            onClick={() => setEventRendering('published')}
                            style={{ backgroundColor: eventRendering == 'published' ? '#f0f0f0' : 'transparent' }}
                        >
                            PUBLISHED EVENTS
                        </button>
                    </section>
                    <section>
                        <button
                            onClick={() => setEventRendering('unpublished')}
                            style={{ backgroundColor: eventRendering == 'unpublished' ? '#f0f0f0' : 'transparent' }}
                        >
                            UNPUBLISHED EVENTS
                        </button>
                    </section>
                </div>
                <div className='home-page-main-data-container'>
                    <AllEventContainer allEvents={allEvents} eventRendering={eventRendering} />
                </div>
            </main >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="create-event-popup-modal"
            >
                <Box sx={style}>
                    <CreateEventPopup handleClose={handleClose} getAllEvents={getAllEvents} />
                </Box>
            </Modal>
        </div >
    )
}

export default HomePage;

