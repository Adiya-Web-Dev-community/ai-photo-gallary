import React, { useEffect, useState } from 'react'
import './Gallary.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Icon } from 'react-icons-kit'
import { upload2 } from 'react-icons-kit/icomoon/upload2'
import { Typography, Modal, Box } from '@mui/material'


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Gallary = () => {
  const { id } = useParams()


  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(false)
  const [imgArr, setImgArr] = useState([])
  //eslint-disable-next-line
  const [details, setDetails] = useState([])
  const [imgGallary, setImgGallary] = useState([])
  const [coverImg, setCoverImg] = useState('')




  //HANDLE FILE CHANGE
  const handleFileChange = (e) => {
    setImages([...images, ...e.target.files]);
  };
  // const handle upload images
  const handleUploadImages = async () => {
    let arr = []
    for (let i = 0; i < images.length; i++) {
      const imgData = new FormData()
      imgData.append('file', images[i])
      imgData.append('upload_preset', 'insta_clone')
      await axios.post('https://api.cloudinary.com/v1_1/harshada0611/image/upload', imgData)
        .then((resp) => {
          arr.push(resp.data.secure_url)
        })
        .catch(err => {
          console.log(err)
        })
    }
    setImgArr(arr)
    setStatus(true)
  }


  //Handle save after uploading all images
  const handleSave = async () => {
    console.log('final image arr', imgArr)
    try {
      const response = await axios.put(`http://localhost:8000/upload-images/${id}`, { postimgArr: imgArr })
      if (response.data.success) {
        console.log('response', response.data.message)
        console.log('response gallary', response.data.data)
        // setImgArr(images)
      }
      else {
        console.log(response.data.message)
      }
    }
    catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    if (status) {
      handleSave();
    }
    else {
      console.log('no image selected')
    }
    //eslint-disable-next-line
  }, [status])

  //GET DATA
  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/get-data/${id}`)
      if (response.data.success) {
        setDetails(response.data.data)
        setImgGallary(response.data.data.imageGallary)
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, [handleSave])



  //get particular image by clicking on it and paste in add cover page section
  const getImage = (image) => {
    console.log(image)
    setCoverImg(image)
  }


 


  return (
    <>
      <div className=' gallary-wrapper-row1'>
        <div className=' gallary-wrapper-username-wrapper1'>
          <h1>username</h1>
        </div>
        <div className=' gallary-wrapper-btn-wrapper'>
          <div><input className="custom-file-input" type="file" multiple
            onChange={handleFileChange} /></div>
          <div>
            <button >Add Video Link</button>
          {/* <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          ></Modal>
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box> */}
          </div>
          <div><button style={{ backgroundColor: 'black', color: 'white' }}
            onClick={handleUploadImages}>Save</button></div>
        </div>
        <div className=' gallary-wrapper-username-wrapper2'>
          <h1>username</h1>
        </div>
      </div>

      <div className='gallary-wrapper'>
        <div className='col1'>
          <div className='options'>
            <p>SHOW ALL</p>
            <p>UNPUBLIC IMAGES</p>
            <p>VIDEOS</p>
          </div>
          <div className='row2'>

            {(imgGallary.length === 0) ? (
              <>

                <div className='upload-icon'>
                  <h5 >Upload Images Here</h5>
                  <Icon className='icon' icon={upload2} size={20}></Icon></div>
              </>
            ) : (
              imgGallary && imgGallary.length > 0 &&
              (imgGallary.map((image, i) => {
                return (
                  <div className='uploaded-images' key={i + 1} onClick={() => { getImage(image) }} >
                    {/* <img src={URL.createObjectURL(image)} alt="" width="100" /> */}
                    <img src={image} alt="" width="100" />
                  </div>
                )

              }))
            )}

          </div>
        </div>

        <div className='col2'>
          <div className='cover-image' >
            {
              coverImg ? (
                <img src={coverImg} alt='coverImg' style={{ width: '100%', height: '100%' }} />
              ) : (<h4>Add Cover Image</h4>)
            }
          </div>
          <div className='edit-description'>
            edit
          </div>
          <div className='event-code'>
            event code
          </div>
          <div className='btn-wrapper'>
            <div>
              <button>share with client</button>
            </div>
            <div>
              <button className='previewbtn'>Preview</button>
              <button className='previewbtn'>Publish</button>
            </div>
          </div>

          <div className='delete-event'>
            delete event
          </div>
        </div>
      </div >


    </>
  )
}

export default Gallary



