import "./add-image-modal.css";
import { toast } from "react-hot-toast";
import axios from "../../../helpers/axios";
import React, { useEffect, useState, useRef } from "react";
import {
  compressImage,
  resizeImage,
  convertBytesToMB,
} from "../../../function/function";
import { uploadImage } from "../../../function/imageFun";
import { useParams } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";

const AddImageModal = ({ handleCloseAddImagesModal }) => {
  const [uploadToDB, setUploadToDB] = useState({
    fileSize: 0,
    uploadImage: [],
  });

  const { eventName, eventId } = useParams();
  const inputRef = useRef(null);
  const requestQueue = useRef([]);
  const [processingQueue, setProcessingQueue] = useState(false);

  const token = localStorage.getItem("token");

  const handalePostIMage = async (url) => {
    await axios
      .post(
        `/event/${eventId}/event-images`,
        {
          imagesArray: [url],
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        processQueue();
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const processQueue = async () => {
    if (!processingQueue && requestQueue.current.length > 0) {
      setProcessingQueue(true);
      const url = requestQueue.current.shift();
      await handalePostIMage(url);
      setUploadToDB((prev) => ({
        ...prev,
        uploadImage: [...prev.uploadImage, url],
      }));
      setProcessingQueue(false);
    }
  };

  // useEffect(() => {
  //     processQueue();
  // }, [processingQueue]);

  // const handleFileChange = async (event) => {
  //     const files = event.target.files;
  //     setUploadToDB(prev => ({ ...prev, fileSize: files.length,uploadImage:[] }));

  //     for (let i = 0; i < files.length; i++) {
  //         try {
  //             const url = await uploadImage(eventName, files[i]);
  //             await handalePostIMage(url); // Wait for the previous request to complete
  //             setUploadToDB(prev => ({
  //                 ...prev,
  //                 uploadImage: [...prev.uploadImage, url]
  //             }));
  //         } catch (error) {
  //             console.error("Error uploading image:", error);
  //             // Handle error if needed
  //         }
  //     }
  // };

  //add watermark
  const watermarkImage2 =
    "https://dummyimage.com/400x400/000/fff.png&text=Dummy+Image"; // Path to your watermark image
  const handleFileChange = async (event) => {
    const files = event.target.files;
    setUploadToDB((prev) => ({
      ...prev,
      fileSize: files.length,
      uploadImage: [],
    }));

    for (let i = 0; i < files.length; i++) {
      try {
        const file = files[i];
        const imgSrc = await readFileAsDataURL(file);
        const watermarkImageUrl = watermarkImage2;
        const watermarkImage = await loadImage(watermarkImageUrl);

        const url = await processImageWithWatermark(
          imgSrc,
          watermarkImage,
          file
        );
        // setUploadToDB(prev => ({
        //     ...prev,
        //     uploadImage: [...prev.uploadImage, url]
        // }));
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle error if needed
      }
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous"; // Set crossOrigin to avoid tainted canvas
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
      image.src = url;
    });
  };

  const processImageWithWatermark = async (imgSrc, watermarkImage, file) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const baseImage = new Image();
    baseImage.crossOrigin = "anonymous"; // Set crossOrigin to avoid tainted canvas
    baseImage.src = imgSrc;
    await new Promise((resolve, reject) => {
      baseImage.onload = () => {
        canvas.width = baseImage.width;
        canvas.height = baseImage.height;
        ctx.drawImage(baseImage, 0, 0);
        const x = canvas.width - watermarkImage.width - 10;
        const y = canvas.height - watermarkImage.height - 10;
        ctx.drawImage(watermarkImage, x, y);

        canvas.toBlob(async (blob) => {
          const url = await uploadImage(eventName, blob);
          // console.log(url)

          await handalePostIMage(url); // Wait for the previous request to complete
          setUploadToDB((prev) => ({
            ...prev,
            uploadImage: [...prev.uploadImage, url],
          }));
          resolve(url);
        }, file.type);
      };
      baseImage.onerror = (error) => reject(error);
    });

    // return url;
  };

  console.log((uploadToDB.uploadImage.length / uploadToDB.fileSize || 0) * 100);

  return (
    <div className="add-image-container">
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <section>
        {uploadToDB.uploadImage.length ? (
          <ul
            className="add-image-ul"
            style={{ display: "grid", gridTemplateColumns: `repeat(4,1fr)` }}
          >
            {uploadToDB.uploadImage.map((image, i) => {
              return (
                <li key={i}>
                  <img src={image} />
                </li>
              );
            })}
          </ul>
        ) : null}
      </section>
      {(uploadToDB.uploadImage.length / uploadToDB.fileSize || 0) * 100 ===
      100 ? (
        <div style={{ display: "flex" }}>
          <Button
            size="large"
            variant="outlined"
            sx={{ marginTop: "10px", marginRight: "10px" }}
            onClick={() => {
              inputRef.current.click();
            }}
          >
            Upload More
          </Button>
          <Button
            onClick={() => handleCloseAddImagesModal()}
            size="large"
            color="error"
            variant="outlined"
            sx={{ marginTop: "10px" }}
          >
            Close
          </Button>
        </div>
      ) : (
        <Button
          size="large"
          variant="outlined"
          sx={{ width: "300px", marginTop: "10px" }}
          onClick={() => {
            inputRef.current.click();
          }}
        >
          upload images
          <CircularProgressWithLabel
            sx={{ margin: "0px 10px" }}
            value={
              (uploadToDB.uploadImage.length / uploadToDB.fileSize || 0) * 100
            }
          />
        </Button>
      )}
    </div>
  );
};

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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

export default AddImageModal;
