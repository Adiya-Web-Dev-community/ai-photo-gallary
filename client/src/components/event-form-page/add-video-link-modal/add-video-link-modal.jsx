import { useState } from 'react';
import './add-video-link-modal.css'
import { RxCross1 } from 'react-icons/rx';
import axios from '../../../helpers/axios'
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const AddVideoLinkModal = ({
   handleCloseVideoLinkModal,
   videoLinkArr,
   setVideoLinkArr,
   getEventDetails,
   eventData }) => {
   const navigate = useNavigate()
   const [videoLink, setVideoLink] = useState("")
   const addVideoLink = () => {
      const array = [...eventData.eventVideoLinks, ...videoLinkArr, videoLink]
      axios.patch(`/update-video-links/${eventData._id}`, array)
         .then((res) => {
            console.log(res)
            if (res.data.success) {
               toast.success("video link added succcessfully!");
               setVideoLinkArr([]);
               setVideoLink("");
               getEventDetails();
               handleCloseVideoLinkModal();
            }
         })
         .catch((err) => {
            console.log(err)
         })
   }
   if (!eventData) {
      return <h1>Loading . . .</h1>
   }

   return (
      <div className='add-video-link-modal-container'>
         {/* <h4><RxCross1 /></h4> */}
         <section>
            <label htmlFor='add-video-link-input-tag'>Enter Video Link</label>
         </section>
         <section>
            <input id='add-video-link-input-tag' type='text' name='videoLink' value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />
         </section>
         <section>
            <button onClick={addVideoLink}>Add</button>
         </section>
      </div>
   )
}

export default AddVideoLinkModal;