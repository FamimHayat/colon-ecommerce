const express = require("express");
const dbConfig = require("./db");
require("dotenv").config();
const cors = require("cors");
const route = require("./routes/routes");
const cookieParser = require("cookie-parser");
const cloudinaryConfig = require("./cloudinary/cloudinaryConfig");
const { webhook } = require("./controllers/orderControllers");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser());
cloudinaryConfig();
dbConfig();

app.post("/webhook", express.raw({ type: "application/json" }), webhook);
app.use(express.json());
app.use(route);

app.listen(5000, () => {
  console.log("server is running on port : 5000");
});
