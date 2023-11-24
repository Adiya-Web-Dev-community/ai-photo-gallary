require("dotenv").config();
const app = require("./app");
const port = process.env.PORT || 8000;

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(
    process.env.MONGO_URL ||
      "mongodb+srv://adiyaprojects:PdZ0DtbKdrilVBk2@cluster0.sldtafy.mongodb.net"
  )
  .then(() => {
    console.log("mongo connection successful");
  })
  .catch((err) => {
    console.log("mongo connection failed", err);
  });

app.get("/", async (res, resp) => {
  resp.send("AI FACE RECOGNITION MERN APP");
});
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
