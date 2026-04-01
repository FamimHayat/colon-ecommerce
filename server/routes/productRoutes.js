const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
} = require("../controllers/productControllers");
const { roleChecker } = require("../middlewares/roleCheckMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const { updateMany } = require("../models/categorySchema");
const upload = multer();

const route = express.Router();

route.post(
  "/upload",
  authMiddleware,
  roleChecker("admin", "editor"),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "imageGallery", maxCount: 4 },
  ]),
  createProduct
);

route.get("/allproducts", getAllProducts);

route.get("/:slug", getProductDetails);
route.put(
  "/update/:slug",
  authMiddleware,
  roleChecker("admin", "editor"),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "imageGallery", maxCount: 4 },
  ]),
  updateProduct
);

module.exports = route;
