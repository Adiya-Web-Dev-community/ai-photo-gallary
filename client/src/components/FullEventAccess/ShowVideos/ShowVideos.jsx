// import React, { useState } from "react";
// import { FaExternalLinkAlt } from "react-icons/fa";
// import "./ShowVideos.css";

// const ShowVideos = () => {
//   const [videoLinks, setVideoLinks] = useState([
//     "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     "https://www.youtube.com/watch?v=xC7e2bo6SQ0",
//     "https://www.youtube.com/watch?v=7T2oje4cYxw",
//     "https://www.youtube.com/watch?v=Q5im0Ssyyus",
//   ]);

//   return (
//     <div className="show-videos-container">
//       {/* <h3 className="show-videos-header">Videos</h3> */}
//       <ul className="video-list">
//         {videoLinks.map((videoLink, index) => (
//           <a
//             href={videoLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="video-link"
//           >
//             <li key={index} className="video-item">
//               Video {index + 1}
//               <FaExternalLinkAlt />
//             </li>
//           </a>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ShowVideos;
//===========================================
import { useState, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import "./ShowVideos.css";
import { useParams } from "react-router-dom";
import axios from "../../../helpers/axios";

const ShowVideos = () => {
  const { eventId } = useParams();
  const [videoLinks, setVideoLinks] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`/event/videos/show-all/${eventId}`);
        console.log(response.data.data);
        setVideoLinks(response.data.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []); // Fetch data only once when the component mounts

  return (
    <div className="show-videos-container">
      {videoLinks.length === 0 ? (
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
          No videos available
        </p>
      ) : (
        <ul className="video-list">
          {videoLinks.map((videoLink, index) => (
            <a
              href={videoLink.link}
              target="_blank"
              rel="noopener noreferrer"
              className="video-link"
              key={index}
            >
              <li className="video-item">
                {videoLink.title}
                <FaExternalLinkAlt />
              </li>
            </a>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowVideos;
