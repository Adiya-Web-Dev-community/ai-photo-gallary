const router = require("express").Router();
const DashBoardDetails = require("../models/dashboard-details");

router.post("/dashboard-details", async (req, resp) => {
  try {
    const newEntry = await DashBoardDetails.create(req.body);
    console.log(newEntry);
    resp.json({
      success: true,
      message: "Your details saved successfully",
      newEntry: newEntry,
    });
  } catch (err) {
    resp.json({ success: false, message: err });
  }
});

router.put("/upload-images/:id", async (req, resp) => {
  const { id } = req.params;
  const { postimgArr } = req.body;
  console.log(id);
  console.log(req.body.postimgArr);
  try {
    const existingData = await DashBoardDetails.findById({ _id: id });

    if (existingData) {
      existingData.imageGallary = postimgArr;
      await existingData.save();
      console.log(existingData);
      resp.json({
        success: true,
        message: "images uploaded successfully",
        data: existingData,
      });
    } else {
      resp.json({ success: true, message: "Cannot upload images" });
    }
  } catch (err) {
    resp.json({ success: false, message: err });
  }
});

///ROUTER TO GET SPECIFIC ACCOUNT DETAILS
router.get("/get-data/:id", async (req, resp) => {
  const { id } = req.params;
  try {
    const data = await DashBoardDetails.findOne({ _id: id });
    console.log(data);
    resp.json({ success: true, data: data });
  } catch (err) {
    resp.json({ success: false, message: err });
  }
});

module.exports = router;
