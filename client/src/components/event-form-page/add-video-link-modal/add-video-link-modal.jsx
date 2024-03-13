import { useEffect, useState } from "react";
import "./add-video-link-modal.css";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, TextareaAutosize } from "@mui/material";
import axios from "../../../helpers/axios";
const AddVideoLinkModal = ({ edit, data, onClick, getEventDetails }) => {
  // const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    description: "",
    thumbnail: "",
  });
  const token = localStorage.getItem("token");

  const { eventId } = useParams();
  console.log(eventId);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      setFormData((prev) => ({ ...prev, thumbnail: base64String }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    const pathUrl = edit
      ? `/event/${eventId}/youtube-links/${data?._id}`
      : `/event/${eventId}/youtube-links`;
    e.preventDefault();

    console.log(pathUrl);
    await axios[edit ? "put" : "post"](
      pathUrl,
      edit
        ? formData
        : {
            videoLinks: [formData],
          },
      {
        headers: {
          authorization: token,
        },
      }
    )
      .then(() => {
        toast.success("Video Link Save");
        getEventDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (edit) {
      setFormData(data);
    }
  }, [edit]);

  return (
    <form onSubmit={handleSubmit} className="add-video-link-modal-container">
      {/* <h4><RxCross1 /></h4> */}
      <div>
        <TextField
          fullWidth
          label={"title"}
          size={"small"}
          value={formData.title}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <TextField
          fullWidth
          label={"Link"}
          size={"small"}
          value={formData.link}
          name="link"
          onChange={handleChange}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>Description</label>
        <TextareaAutosize
          style={{
            width: "100%",
            height: "80px",
            borderRadius: "5px",
            padding: "5px",
          }}
          value={formData.description}
          name="description"
          onChange={handleChange}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileChange}
        />

        {formData.thumbnail && (
          <img
            src={formData.thumbnail}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "200px", marginTop: "1rem" }}
          />
        )}
        <label style={{ width: "100%" }} htmlFor="contained-button-file">
          {/* <Button
          variant='outlined'
          color="primary"
          component="span"
         //  startIcon={<CloudUploadIcon />}
         fullWidth
          sx={{ marginTop: '1rem', }}
        >
          Upload
        </Button> */}
        </label>
      </div>

      <div style={{ marginTop: "20px" }}>
        {edit ? (
          <Button type="submit" variant="contained">
            Update
          </Button>
        ) : (
          <Button type="submit" variant="contained">
            Save
          </Button>
        )}
      </div>
    </form>
  );
};

export default AddVideoLinkModal;
