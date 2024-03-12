import './add-image-modal.css'
import { toast } from "react-hot-toast";
import axios from '../../../helpers/axios'
import { useEffect, useState } from 'react';
import { compressImage,resizeImage,convertBytesToMB } from '../../../function/function';
const AddImageModal = ({
    handleCloseAddImagesModal,
    imgArr,
    setImgArr,
    imgLinkArr,
    setImgLinkArr,
    eventData,
    getEventDetails }) => {

    const [uploadToDB, setUploadToDB] = useState(false)

    // const handleImages = (e) => {
    //     setImgArr([...e.target.files])
    // }

    // for (let i = 0; i < imgArr.length; i++) {
    //     console.log(`imgArr[${i}] => `, URL.createObjectURL(imgArr[i]))
    // }

    // const uploadImages = async () => {
    //     if (!imgArr.length) {
    //         return toast.error('no image selected')
    //     }
    //     let arr = [];
    //     toast.loading("Uploading images! please wait");
    //     for (let i = 0; i < imgArr.length; i++) {
    //         const imgData = new FormData()
    //         imgData.append("file", imgArr[i])
    //         imgData.append("upload_preset", "ketanInstaClone")
    //         await axios.post("https://api.cloudinary.com/v1_1/ketantb/image/upload", imgData)
    //             .then((res) => {
    //                 arr.push({ published: false, image: res.data.url })
    //                 // arr.push(res.data.url)
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })
    //     }
    //     toast.dismiss()
    //     console.log(arr)
    //     setImgLinkArr(arr)
    //     !uploadToDB ? setUploadToDB(true) : setUploadToDB(false)
    // }

    // const patchImagestoDB = () => {
    //     let array = [...eventData.eventImages, ...imgLinkArr]
    //     console.log("array => ", array)
    //     axios.patch(`/update-event-images/${eventData._id}`, array)
    //         .then((res) => {
    //             console.log(res)
    //             if (res.data.success) {
    //                 setImgArr([])
    //                 setUploadToDB(false)
    //                 getEventDetails()
    //                 handleCloseAddImagesModal()
                    
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    // useEffect(() => {
    //     if (uploadToDB) {
    //         patchImagestoDB();
    //     }
    // }, [uploadToDB])


        
    const getBase64Size = (base64String) => {
        // Remove data URL prefix (e.g., "data:image/jpeg;base64,") before calculating length
        const base64Data = base64String.split(',')[1];
        // Get the length of the Base64 string in bytes
        return Math.round((base64Data.length * 3) / 4 - 2);
      };
        
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
      
        reader.onload = () => {
          const base64String = reader.result;
          const originalSize = base64String.length;

          setUploadToDB(base64String)

        //   console.log('Original Size:', convertBytesToMB(originalSize));
      
          resizeImage(base64String, 800, 600, (resizedImage) => {
            compressImage(resizedImage, (compressedImage) => {
                console.log(compressedImage)
              const newBits = getBase64Size(compressedImage);
             console.log(newBits) 
              console.log('New Size:',convertBytesToMB(compressedImage.length));
              console.log('Size Difference:', convertBytesToMB(originalSize - compressedImage.length));
            });
          });
        };
      
        reader.readAsDataURL(file);
      };

      console.log(uploadToDB)
      
    return (
        <div className='add-image-container'>
            <section>
                <input type='file'  onChange={handleFileChange} />
            </section>
            <section>
                {/* {imgArr.length ?
                    <ul className='add-image-ul'>
                        {imgArr.map((image) => {
                            return (
                                <li key={URL.createObjectURL(image)}>
                                    <img src={URL.createObjectURL(image)} />
                                </li>
                            )
                        })}
                    </ul>
                    : null} */}
            </section>
            <section>
                {/* <button onClick={handleFileChange}>
                    upload images
                </button> */}
            </section>
        </div>
    )
}

export default AddImageModal