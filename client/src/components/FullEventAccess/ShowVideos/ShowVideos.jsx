import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import "./ShowVideos.css";

const ShowVideos = () => {
  const [videoLinks, setVideoLinks] = useState([
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://www.youtube.com/watch?v=xC7e2bo6SQ0",
    "https://www.youtube.com/watch?v=7T2oje4cYxw",
    "https://www.youtube.com/watch?v=Q5im0Ssyyus",
  ]);

  return (
    <div className="show-videos-container">
      {/* <h3 className="show-videos-header">Videos</h3> */}
      <ul className="video-list">
        {videoLinks.map((videoLink, index) => (
          <a
            href={videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="video-link"
          >
            <li key={index} className="video-item">
              Video {index + 1}
              <FaExternalLinkAlt />
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
};

export default ShowVideos;
