const express = require("express");
const {
  createCategory,
  getAllCategory,
} = require("../controllers/categoryControllers");
const multer = require("multer");
const upload = multer();
const authMiddleware = require("../middlewares/authMiddleware");
const { getProductDetails } = require("../controllers/productControllers");

const route = express.Router();

route.post(
  "/create",
  authMiddleware,
  upload.single("category-thumbnail"),
  createCategory,
);
route.get("/getall", getAllCategory);
route.get("/details", getProductDetails);

module.exports = route;
