import { useNavigate } from 'react-router-dom';
import './create-event-pop-up.css'
import { RxCross1 } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import axios from '../../../helpers/axios'
import { toast } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { getCreateEventData } from '../../../store/reducer';


const CreateEventPopup = ({ handleClose, getAllEvents }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const [createEventForm, setCreateEventForm] = useState({ eventName: "", eventDate: "", eventCoverPage: "", })
    const [coverPageURL, setCoverPageURL] = useState()
    const [coverPage, setCoverPage] = useState("")
    const [runPostForm, setRunPostForm] = useState(false)
    const handleCreateEventForm = (e) => {
        setCreateEventForm({ ...createEventForm, [e.target.name]: e.target.value })
    }

    const coverPageUpload = async (e) => {
        e.preventDefault();
        toast.loading("Uploading cover page");
        if (!createEventForm.eventName || !createEventForm.eventDate) {
            toast.error("Event name & date are mandatory fields");
        }
        else if (!coverPage) {
            toast.error("No cover page chosen!")
        }
        const imgData = new FormData()
        imgData.append("file", coverPage)
        imgData.append("upload_preset", "ketanInstaClone")
        await axios.post("https://api.cloudinary.com/v1_1/ketantb/image/upload", imgData)
            .then((res) => {
                // setForm({ ...form, imgUrl: res.data.url })
                toast.dismiss()
                // setCoverPageURL(res.data.url)
                setCreateEventForm({ ...createEventForm, eventCoverPage: res.data.url })
                
            })
            .catch((err) => {
                console.log(err)
            })
        setRunPostForm(true)
    }

    const postCreateEventForm = async () => {
        console.log(coverPageURL);
        // setCreateEventForm({ ...createEventForm, eventCoverPage: coverPageURL })
        console.log(createEventForm)
        // setCoverPageURL(false)
        // return;
        await axios.post('/event', createEventForm, {
            headers: {
                authorization: token
            }
        })
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                    const eventName = res.data.message.eventName;
                    const eventId = res.data.message._id;
                    dispatch(getCreateEventData(createEventForm))
                    getAllEvents()
                    setCoverPageURL()
                    setRunPostForm(false)
                    handleClose()
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (runPostForm) {
            postCreateEventForm()
        }
    }, [runPostForm])

    return (
        <div className="create-event-pop-up-container">
            <div className='create-event-pop-up-header'>
                <h4>Create Event</h4>
                <h4 onClick={handleClose}><RxCross1 /></h4>
            </div>
            <div className='create-event-pop-up-main'>
                <section>
                    <label>Event Name</label>
                    <input type="text" name='eventName' onChange={handleCreateEventForm} />
                </section>
                <section>
                    <label>Create Date</label>
                    <input type="date" name='eventDate' onChange={handleCreateEventForm} />
                </section>
                <section>
                    {coverPage ?
                        <img src={URL.createObjectURL(coverPage)} style={{ width: '250px', height: '200px', border: '1px solid black' }} />
                        :
                        null
                        // <img src='' alt='Event Cover Page(1080 × 1080)' style={{ width: '250px', height: '200px', border: '1px solid black' }} />
                    }
                </section>
                <section>
                    <label>Event Cover Page(1080 × 1080)</label>
                    <input type="file" name='' onChange={(e) => setCoverPage(e.target.files[0])} />
                </section>
            </div>
            <div className='create-event-pop-up-save-btn-container'>
                {/* <button onClick={() => navigate('/event-form-page')}> */}
                <button onClick={coverPageUpload}>
                    save
                </button>
            </div>
        </div>
    )
}

export default CreateEventPopup