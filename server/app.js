const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const coderoute = require("./Routes/coderoutes");
const userRoutes = require("./Routes/userRoute");
const errMiddleware = require("./middleware/error");
const cloudinary = require("cloudinary").v2;
const connectToMongo = require("./config/Db");

dotenv.config({ path: "server/config/config.env" });
connectToMongo();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", coderoute);
app.use("/api/v1", userRoutes);
app.use(errMiddleware);
module.exports = app;
