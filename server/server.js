const express = require("express");
const dbConfig = require("./db");
require("dotenv").config();
const cors = require("cors");
const route = require("./routes/routes");
const cookieParser = require("cookie-parser");
const cloudinaryConfig = require("./cloudinary/cloudinaryConfig");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser());
cloudinaryConfig();
dbConfig();
app.use(route);

app.listen(5000, () => {
  console.log("server is running on port : 5000");
});
