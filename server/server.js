const express = require("express");
const dbConfig = require("./db");
require("dotenv").config();
const route = require("./routes/routes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

dbConfig();
app.use(route);

app.listen(5000, () => {
  console.log("server is running on port : 5000");
});
