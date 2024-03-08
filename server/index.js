require("dotenv").config();
const app = require("./app");
const port = process.env.PORT || 8000;

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(
    process.env.MONGO_URL ||
      "mongodb+srv://syedabdullahali380:JfqCt7Fmbm6v8M9d@cluster0.tua2bt0.mongodb.net"
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
