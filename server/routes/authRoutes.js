const express = require("express");
const multer = require("multer");
const upload = multer();

const {
  signUp,
  signIn,
  verifyOtp,
  resendOtp,
  forgetPassword,
  resetPassword,
  getProfile,
  updateProfile,
  refreshAccessToken,
} = require("../controllers/authControllers");
const authMiddleware = require("../middlewares/authMiddleware");

const route = express.Router();

route.post("/signup", signUp);
route.post("/verifyotp", verifyOtp);
route.post("/resendotp", resendOtp);
route.post("/signin", signIn);
route.post("/forgetpassword", forgetPassword);
route.post("/resetpassword/:token", resetPassword);
route.get("/getprofile", authMiddleware, getProfile);
route.put(
  "/updateprofile",
  authMiddleware,
  upload.single("avatar"),
  updateProfile
);
route.post("/sessionlogout", refreshAccessToken);

module.exports = route;
