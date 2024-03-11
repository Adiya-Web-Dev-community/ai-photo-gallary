const { default: mongoose } = require("mongoose");
var mongose = require("mongoose");

const dashboardSchema = new mongose.Schema({
  plan: [
    {
      planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plans",
      },
      active: Boolean,
      date: Date,
    },
  ],
  companyName: {
    type: String,
  },
  companyLogo: {
    type: String,
  },
  companyEmail: {
    type: String,
  },
  socialLinks: [
    {
      linkType: {
        type: String,
        enum: [
          "facebook",
          "instagram",
          "twitter",
          "linkedin",
          "youtube",
          "website",
          "other",
        ],
      },
      link: {
        type: String,
      },
    },
  ],

  contactNo : {
    type : String
  },
  companyAddress: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const dashboardModel = mongose.model("dashboard", dashboardSchema);

module.exports = dashboardModel;
