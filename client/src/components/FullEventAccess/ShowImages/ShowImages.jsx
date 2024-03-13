import React, { useState } from "react";
import "./ShowImages.css"; // Import CSS file for styling

const ShowImages = () => {
  // const [imageUrls, setImageUrls] = useState([
  //   "https://dummyimage.com/1050x550/8a8a8a/fff",
  //   "https://dummyimage.com/1080x1250/8a8a8a/fff",
  //   "https://dummyimage.com/250x250/8a8a8a/fff",
  //   "https://dummyimage.com/250x250/8a8a8a/fff",
  // ]);
  const [imageUrls, setImageUrls] = useState([
    "https://source.unsplash.com/1050x550/?nature",
    "https://source.unsplash.com/1080x1250/?travel",
    "https://source.unsplash.com/250x250/?animal",
    "https://source.unsplash.com/250x250/?food",
  ]);

  // State to manage the modal visibility and the selected image URL
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  // Function to handle image click and open modal
  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedImageUrl("");
  };

  return (
    <div>
      {/* <h2>Images</h2> */}
      {/* Mapping over imageUrls and rendering images */}
      <div className="image-container">
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index + 1}`}
            onClick={() => handleImageClick(imageUrl)}
            className="image-thumbnail"
          />
        ))}
      </div>

      {/* Modal for displaying the clicked image */}
      {modalVisible && (
        <div className="modal" onClick={closeModal}>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImageUrl} alt="Selected Image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowImages;
