import { Box, Button,Card,CardMedia } from '@mui/material'
import './images-corousal.css'
import { useParams } from 'react-router-dom'
import axios from '../../../../helpers/axios'
const ImagesCorousal = ({imgUrl,handleCloseImagesCorousalModal}) => {

    const {eventId,eventName} = useParams()
    const token = localStorage.getItem('token')


    const handaleDeleteImage= async ()=>{
        await axios.post(`/event/${eventId}/event-images`,{
            imagesArray:[imgUrl]
        },
        {
            headers: {
              authorization: token,
            },
          }
        ).then((res)=>{
         return res
        }).catch((error)=>{
            console.log(error)
        })
    
       }

       const handleDownload = () => {
        // Create an anchor element
        const anchor = document.createElement('a');
        anchor.href = downloadUrl;
    
        // Extract filename from URL
        const urlParts = anchor.href.split('/');
        const filename = urlParts[urlParts.length - 1];
        anchor.download = filename;
    
        // Append the anchor to the body
        document.body.appendChild(anchor);
    
        // Click the anchor to trigger the download
        anchor.click();
    
        // Remove the anchor from the body
        document.body.removeChild(anchor);
    };
    
    return (
        <>
          <CardMedia sx={{width:'400px',height:'300px',marginBottom:'10px'}}>
            <img src={imgUrl} style={{height:'100%',width:'100%'}}/>
          </CardMedia>
          <Box sx={{
            display:'flex',
            justifyContent:'center',
            
          }}>
          <Button color='error' variant='contained' onClick={()=>{handaleDeleteImage()}}>
           Delete
          </Button>
          <Button sx={{margin:'0px 10px'}} color='primary' variant='contained' onClick={()=>{handleDownload(imgUrl)}}>
           Download
          </Button>
          <Button color='error' variant='outlined' onClick={()=>{handleCloseImagesCorousalModal()}}>
           Close
          </Button>
          </Box>
        </>
    )
}

export default ImagesCorousal