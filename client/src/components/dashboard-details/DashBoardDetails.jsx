import React, { useEffect, useState } from "react";
import "./DashBoardDetails.css";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../../helpers/axios";
import { toast } from "react-hot-toast";

const DashBoardDetails = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [companyDetails, setCompanyDetails] = useState();

  //   const getDashboardDetails = () => {
  //     axios
  //       .get("/dashboard-details", {
  //         headers: {
  //           authorization: token,
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res.data.userData);
  //         setCompanyDetails(res.data.userData);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  const [dashboardData, setDashboardData] = useState({
    companyName: "",
    contactNo: "",
    companyEmail: "",
    socialLink: "",
    companyLogo: "",
    address: "",
  });
  const [logo, setLogo] = useState("");
  // const [watermark, setWatermark] = useState({

  // })

  //HANDLE INPUTS OF dashboardData
  const handleInputs = (e) => {
    setDashboardData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //UPLOAD LOGO
  const handleUploadLogo = async () => {
    // navigate('/watermaker-setup')
    // return navigate('/home-page')
    const logoImg = new FormData();
    logoImg.append("file", logo);
    logoImg.append("upload_preset", "adiya_projects");

    await axios
      .post(
        "https://api.cloudinary.com/v1_1/adiyaprojects/image/upload",
        logoImg
      )
      .then((response) => {
        console.log(response);
        setDashboardData({
          ...dashboardData,
          companyLogo: response.data.secure_url,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //HANDLE SAVE
  const handleSave = async () => {
    const DashBoardDetails = {
      companyName: dashboardData.companyName,
      companyLogo: dashboardData.companyLogo,
      contactNo: dashboardData.contactNo,
      companyEmail: dashboardData.companyEmail,
      socialLink: dashboardData.socialLink,
      address: dashboardData.address,
    };
    console.log("final result", DashBoardDetails);
    const response = await axios.post(`dashboard-details`, DashBoardDetails, {
      headers: {
        authorization: token,
      },
    });
    if (response.data.success) {
      setDashboardData();
      toast.success("company dashboard updated successfully");
      navigate("/home-page");
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    if (dashboardData.companyLogo) {
      handleSave();
    }
    // eslint-disable-next-line
  }, [dashboardData.companyLogo]);

  useEffect(() => {
    getDashboardDetails();
  }, []);

  return (
    <div className="dashboard-details-wrappper">
      <h2>Dashboard Settings</h2>
      <h6>Update your account details, profile and more</h6>

      <form className="container">
        <TextField
          type="text"
          className="form-control"
          label="Company Name"
          name="companyName"
          value={dashboardData.companyName}
          onChange={handleInputs}
        />

        <Box className="company-logo">
          <label>Company Logo</label>
          <input
            className="file-btn"
            id="upload-file"
            type="file"
            onChange={(e) => setLogo(e.target.files[0])}
          />
        </Box>

        <TextField
          type="number"
          className="form-control"
          label="Contact Number"
          name="contactNo"
          value={dashboardData.contactNo}
          onChange={handleInputs}
        />

        <TextField
          className="form-control"
          label="Office/ Home Address"
          name="address"
          value={dashboardData.address}
          onChange={handleInputs}
        />

        {/* <Box className='watermark-wrapper'>
                    <div>Watermark</div>
                </Box> */}

        <TextField
          type="email"
          className="form-control"
          label="Company Email"
          name="companyEmail"
          value={dashboardData.companyEmail}
          onChange={handleInputs}
        />
        <TextField
          type="text"
          className="form-control"
          label="Social Link"
          name="socialLink"
          alue={dashboardData.socialLink}
          onChange={handleInputs}
        />

        <Box className="savebtn-wrapper">
          <Button
            variant="contained"
            className="btn"
            onClick={handleUploadLogo}
          >
            SAVE
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default DashBoardDetails;
