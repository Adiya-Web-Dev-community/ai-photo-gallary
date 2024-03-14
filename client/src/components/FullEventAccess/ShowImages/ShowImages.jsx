// import { useState } from "react";
// import "./ShowImages.css"; // Import CSS file for styling

// const ShowImages = () => {
//   // const [imageUrls, setImageUrls] = useState([
//   //   "https://dummyimage.com/1050x550/8a8a8a/fff",
//   //   "https://dummyimage.com/1080x1250/8a8a8a/fff",
//   //   "https://dummyimage.com/250x250/8a8a8a/fff",
//   //   "https://dummyimage.com/250x250/8a8a8a/fff",
//   // ]);
//   const [imageUrls, setImageUrls] = useState([]);

//   // State to manage the modal visibility and the selected image URL
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedImageUrl, setSelectedImageUrl] = useState("");

//   // Function to handle image click and open modal
//   const handleImageClick = (imageUrl) => {
//     setSelectedImageUrl(imageUrl);
//     setModalVisible(true);
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     setModalVisible(false);
//     setSelectedImageUrl("");
//   };

//   return (
//     <div>
//       {/* <h2>Images</h2> */}
//       {/* Mapping over imageUrls and rendering images */}
//       {imageUrls.length === 0 ? (
//         <p
//           style={{
//             fontSize: "1.5rem",
//             fontWeight: "800",
//             marginTop: "1.5rem",
//             marginBottom: "2rem",
//             textAlign: "center",
//             color: "#1f282f",
//           }}
//         >
//           No Images Available
//         </p>
//       ) : (
//         <div className="image-container">
//           {imageUrls.map((imageUrl, index) => (
//             <img
//               key={index}
//               src={imageUrl}
//               alt={`Image ${index + 1}`}
//               onClick={() => handleImageClick(imageUrl)}
//               className="image-thumbnail"
//             />
//           ))}
//         </div>
//       )}

//       {/* Modal for displaying the clicked image */}
//       {modalVisible && (
//         <div className="modal" onClick={closeModal}>
//           <span className="close" onClick={closeModal}>
//             &times;
//           </span>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <img src={selectedImageUrl} alt="Selected Image" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowImages;
//============================================
import { useState, useEffect } from "react";
import "./ShowImages.css"; // Import CSS file for styling
import { useParams } from "react-router-dom";
import axios from "../../../helpers/axios";

const ShowImages = () => {
  const { eventId } = useParams();
  const [imageUrls, setImageUrls] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/event/images/show-all/${eventId}`);
        console.log(response.data);
        console.log(response.data.imagesArray);
        setImageUrls(response.data.imagesArray);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchData();
  }, []); // Fetch data only once when the component mounts

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImageUrl("");
  };

  return (
    <div>
      {imageUrls.length === 0 ? (
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "800",
            marginTop: "1.5rem",
            marginBottom: "2rem",
            textAlign: "center",
            color: "#1f282f",
          }}
        >
          No images available
        </p>
      ) : (
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
      )}

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
