const express = require("express");
const { signUp, signIn, verifyOtp } = require("../controllers/authControllers");

const route = express.Router();

route.post("/signup", signUp);
route.post("/verifyotp", verifyOtp);
route.post("/signin", signIn);

module.exports = route;
