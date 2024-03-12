import React, { useState } from 'react';
import './ShowImages.css'; // Import CSS file for styling

const ShowImages = () => {
  const [imageUrls,setImageUrls]=useState([ 'https://dummyimage.com/1050x550/8a8a8a/fff',
  'https://dummyimage.com/1080x1250/8a8a8a/fff',
  'https://dummyimage.com/250x250/8a8a8a/fff',
  'https://dummyimage.com/250x250/8a8a8a/fff',])
  

  // State to manage the modal visibility and the selected image URL
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  // Function to handle image click and open modal
  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedImageUrl('');
  };

  return (
    <div>
      <h3>Images</h3>
      {/* Mapping over imageUrls and rendering images */}
      {imageUrls.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Image ${index + 1}`}
          onClick={() => handleImageClick(imageUrl)}
          className="image-thumbnail"
        />
      ))}

      {/* Modal for displaying the clicked image */}
      {modalVisible && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img src={selectedImageUrl} alt="Selected Image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowImages;
