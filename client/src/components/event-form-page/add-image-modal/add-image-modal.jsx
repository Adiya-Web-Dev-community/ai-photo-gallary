import './add-image-modal.css'
import { toast } from "react-hot-toast";
import axios from '../../../helpers/axios'
import React,{ useEffect, useState,useRef } from 'react';
import { compressImage,resizeImage,convertBytesToMB } from '../../../function/function';
import { uploadImage } from '../../../function/imageFun';
import { useParams } from 'react-router-dom';
import { Button,Typography,Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';

const AddImageModal = ({handleCloseAddImagesModal}) => {

    
    const [uploadToDB, setUploadToDB] = useState({
        fileSize:0,
        uploadImage:[]
    })

   const {eventName,eventId}= useParams()
   const inputRef = useRef(null)
   const requestQueue = useRef([]);
   const [processingQueue, setProcessingQueue] = useState(false);

   const token = localStorage.getItem("token");
         

   const handalePostIMage= async (url)=>{
    await axios.post(`/event/${eventId}/event-images`,{
        imagesArray:[url]
    },
    {
        headers: {
          authorization: token,
        },
      }
    ).then((res)=>{
        processQueue();
     return res
    }).catch((error)=>{
        console.log(error)
    })

   }

   const processQueue = async () => {
    if (!processingQueue && requestQueue.current.length > 0) {
        setProcessingQueue(true);
        const url = requestQueue.current.shift();
        await handalePostIMage(url);
        setUploadToDB(prev => ({
            ...prev,
            uploadImage: [...prev.uploadImage, url]
        }));
        setProcessingQueue(false);
    }
};

// useEffect(() => {
//     processQueue();
// }, [processingQueue]);


const handleFileChange = async (event) => {
    const files = event.target.files;
    setUploadToDB(prev => ({ ...prev, fileSize: files.length,uploadImage:[] }));

    for (let i = 0; i < files.length; i++) {
        try {
            const url = await uploadImage(eventName, files[i]);
            await handalePostIMage(url); // Wait for the previous request to complete
            setUploadToDB(prev => ({
                ...prev,
                uploadImage: [...prev.uploadImage, url]
            }));
        } catch (error) {
            console.error("Error uploading image:", error);
            // Handle error if needed
        }
    }
};

 


    console.log((uploadToDB.uploadImage.length /uploadToDB.fileSize||0 )*100)
          
    return (
        <div className='add-image-container'>
                <input ref={inputRef} style={{display:'none'}} type='file' multiple  onChange={handleFileChange} />
            <section>
                {uploadToDB.uploadImage.length ?
                    <ul className='add-image-ul' style={{display:'grid',gridTemplateColumns:`repeat(4,1fr)`}}>
                        {uploadToDB.uploadImage.map((image,i) => {
                            return (
                                <li key={i} >
                                    <img src={image} />
                                </li>
                            )
                        })}
                    </ul>
                    : null}
            </section>
            {((uploadToDB.uploadImage.length /uploadToDB.fileSize||0 )*100) ===100?
             <div style={{display:'flex'}}>
             <Button   size='large' variant='outlined' sx={{marginTop:'10px',marginRight:'10px'}}
             onClick={()=>{
                inputRef.current.click()  
            }}
             >
              Upload More
             </Button>
             <Button onClick={()=>handleCloseAddImagesModal()}  size='large' color='error' variant='outlined' sx={{marginTop:'10px'}}>
              Close
             </Button>
             </div>
            :
                <Button size='large' variant='outlined' sx={{width:'300px',marginTop:'10px'}} onClick={()=>{
                    inputRef.current.click()
                }}>
                    upload images
                    <CircularProgressWithLabel sx={{margin:'0px 10px'}} value={(uploadToDB.uploadImage.length /uploadToDB.fileSize||0 )*100} />
                </Button>
}
        </div>
    )
}

  
  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }
  
  CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
  };
  
  

export default AddImageModal