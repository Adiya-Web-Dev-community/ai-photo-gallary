const { urlencoded } = require("body-parser");

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

//routers
app.use(require("./routes/userRoutes"));
app.use(require("./routes/planRoutes"));
app.use(require("./routes/eventRoutes"));
app.use(require("./routes/dashboardRoutes"));
app.use(require("./routes/requestRoutes"));

module.exports = app;
