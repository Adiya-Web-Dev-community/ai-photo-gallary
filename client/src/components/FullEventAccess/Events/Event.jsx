import React from "react";
import ShowImages from "../ShowImages/ShowImages";
import ShowVideos from "../ShowVideos/ShowVideos";
import "./Event.css";

const Event = () => {
  const [tab, setTab] = React.useState("images");

  return (
    <div className="event-container">
      {/* <h1 className="event-title">Event Name</h1> */}
      <div className="tabs">
        <button
          className={`tab-button ${tab === "images" ? "active" : ""}`}
          onClick={() => setTab("images")}
        >
          Images
        </button>
        <button
          className={`tab-button ${tab === "videos" ? "active" : ""}`}
          onClick={() => setTab("videos")}
        >
          Videos
        </button>
      </div>
      <div className="show-container">
        {tab === "images" ? <ShowImages /> : <ShowVideos />}
      </div>
    </div>
  );
};

export default Event;
