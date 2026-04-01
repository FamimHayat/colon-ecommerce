const express = require("express");

const route = express.Router();
const categoryRoute = require("./categoryRoute");
const authMiddleware = require("../middlewares/authMiddleware");
const orderRoute = require("./orderRoutes");

route.use("/auth", require("./authRoutes"));
route.use("/product", require("./productRoutes"));
route.use("/category", categoryRoute);
route.use("/cart", authMiddleware, require("./cartRoute"));
route.use(authMiddleware, orderRoute);

module.exports = route;
