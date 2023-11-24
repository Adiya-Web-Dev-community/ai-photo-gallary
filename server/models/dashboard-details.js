const mongoose = require("mongoose");

const DashboardDetailsSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  companyLogo: {
    type: String,
  },
  contactNo: {
    type: Number,
  },
  // watermark: {
  //     type: Array
  // },
  companyEmail: {
    type: String,
  },
  socialLink: {
    type: String,
  },
  imageGallary: {
    type: Array,
  },
  videoGallary: {
    type: Array,
  },
  // reference=user,event
});

const DashboardDetailsModel = mongoose.model(
  "dashboard-details",
  DashboardDetailsSchema
);
module.exports = DashboardDetailsModel;
