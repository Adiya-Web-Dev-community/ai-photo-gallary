import { useNavigate,useParams } from 'react-router-dom';
import './create-event-pop-up.css'
import { RxCross1 } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import axios from '../../../helpers/axios'
import { toast } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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
            .then(() => {
               toast.success('Video Link Save')
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
            <div>
                    <TextField size='small' fullWidth value={createEventForm.eventName} label={'Event Name'} type="text" name='eventName' onChange={handleCreateEventForm} />
             
                    <TextField sx={{
                        margin:'10px 0px'
                    }} size='small' fullWidth type="date" name='eventDate' onChange={handleCreateEventForm} />

<FormControlLabel
        control={
          <Checkbox
          
            color="primary" // Change color if needed
          />
          
        }
        label="Full Access"
      /><br/>
      
<FormControlLabel
        control={
          <Checkbox
          
            color="primary" // Change color if needed
          />
          
        }
        label="Face Search"
      />
                {/* <section>
                
                    <label>Full Access</label>
                    <TextField type="checkbox"  />
                </section>
                <section>
                    <label>Face Search</label>
                    <TextField type="checkbox"  />
                </section> */}
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