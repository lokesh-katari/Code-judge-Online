const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const coderoute = require("./Routes/coderoutes");
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", coderoute);
module.exports = app;
