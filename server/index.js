require("dotenv").config();
const app = require("./app");
const port = process.env.PORT || 8000;

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("Yeah! Server is connected to Database");
    })
    .catch((err) => {
        console.log("Oh! Database connection error", err);
    });
app.get("/", async (res, resp) => {
    resp.send("AI FACE RECOGNITION MERN APP");
});
app.listen(port, () => {
    console.log(`AI Project Server is running on port ${port}`);
});


