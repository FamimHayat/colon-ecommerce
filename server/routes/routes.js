const express = require("express");

const route = express.Router();

route.use("/auth", require("./authRoutes"));
route.use("/product", require("./productRoutes"));

module.exports = route;
