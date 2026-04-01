const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../cloudinary/cloudinaryservices");
const generateOTP = require("../helpers/generateOtp");
const { sendEmail } = require("../helpers/sendEmail");
const userSchema = require("../models/userSchema");
const {
  generateAccessToken,
  generateRefreshToken,
  generateResetPasswordToken,
  verifyResetPassToken,
} = require("../tokens/tokens");
const {
  EmailVerifyOtpTemplate,
  forgetPasswordTemplate,
} = require("../utils/templates");
const { isValidEmail } = require("../utils/validations");

const signUp = async (req, res) => {
  try {
    const { fullName, email, password, phone, address } = req.body;

    if (!email) return res.status(404).send({ error: "email is required..!" });
    if (!isValidEmail(email))
      return res.status(400).send({ error: "enter a valid email..!" });
    if (!password)
      return res.status(404).send({ error: "password is required..!" });

    const existingUser = await userSchema.findOne({ email });

    if (existingUser)
      return res
        .status(400)
        .send({ error: "user already exist with this email..!" });

    const otp = generateOTP();

    const user = new userSchema({
      fullName,
      email,
      password,
      phone,
      address,
      otp,
      otpExpiry: Date.now() + 2 * 60 * 1000,
    });

    sendEmail({
      email,
      subject: "Email Verification..!",
      otp,
      html: EmailVerifyOtpTemplate({
        otp,
        brandName: "colon-fashion",
      }),
    });

    user.save();

    res
      .status(201)
      .send({ success: "user profile has been created successfully..!" });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(`signUp controller : from authControllers ${error.message} `);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email) return res.status(400).send({ error: "email is required..!" });
    if (!isValidEmail(email))
      return res.status(400).send({ error: "enter a valid email..!" });
    if (!otp)
      return res.status(400).send({ error: "otp number is required..!" });

    const user = await userSchema.findOne({
      email,
      otp: Number(otp),
      otpExpiry: { $gt: new Date() },
      isVerified: false,
    });

    if (!user) return res.status(404).send({ error: "invalid credential..!" });

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    user.save();

    res.status(200).send({ success: "otp verification successful..!" });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(
      `verifyOtp controller : from authControllers ${error.message} `,
    );
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(404).send({ error: "invalid request..!" });
    if (!isValidEmail(email))
      return res.status(400).send({ error: "enter a valid email..!" });

    const user = await userSchema.findOne({
      email,
      isVerified: false,
    });

    if (!user) return res.status(400).send({ error: "invalid request..!" });

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiry = Date.now() + 2 * 60 * 1000;
    user.save();

    sendEmail({
      email,
      subject: "Email Verification..!",
      otp,
      html: EmailVerifyOtpTemplate({
        otp,
        brandName: "colon-fashion",
      }),
    });

    res
      .status(200)
      .send({ success: "a new otp has been sent to your email..!" });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(
      `resendOtp controller : from authControllers ${error.message} `,
    );
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).send({ error: "email is required..!" });
    if (!isValidEmail(email))
      return res.status(400).send({ error: "enter a valid email..!" });
    const existingUser = await userSchema.findOne({ email });
    if (!existingUser)
      return res
        .status(400)
        .send({ error: "user does not exist with this email..!" });
    if (!existingUser.isVerified)
      return res.status(400).send({ error: "please verify your email..!" });
    if (!password)
      return res.status(400).send({ error: "password is required..!" });

    const passwordMatch = await existingUser.comparePassword(password);
    if (!passwordMatch)
      return res.status(400).send({ error: "password does not match..!" });
    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);

    res.cookie("ACCESS_TOKEN", accessToken, {
      maxAge: 7200000,
      httpOnly: false,
      secure: false,
      // sameSite: "None",
    });

    res.cookie("REFRESH_TOKEN", refreshToken, {
      maxAge: 1296000000,
      httpOnly: false,
      secure: false,
      // sameSite: "None",
    });

    res.status(200).send({ success: "logged in successfully..!" });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(`signIn controller : from authControllers ${error.message} `);
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(404).send({ error: "email is required..!" });
    if (!isValidEmail(email))
      return res.status(400).send({ error: "enter a valid email..!" });

    const existingUser = await userSchema.findOne({ email });
    if (!existingUser)
      return res.status(404).send({ error: "invalid request..!" });

    const { resetPassHashedToken, resetPassToken } =
      generateResetPasswordToken();

    existingUser.resetPasswordToken = resetPassHashedToken;
    existingUser.resetPasswordTokenExpiry = Date.now() + 2 * 60 * 1000;
    existingUser.save();

    const resetPasswordLink = `${
      process.env.CLIENT_URL || "http://localhost:5000"
    }/resetpass/?sec=${resetPassToken}`;

    sendEmail({
      email,
      subject: "reset your password..!",
      html: forgetPasswordTemplate({
        brandName: "colon",
        links: resetPasswordLink,
      }),
    });

    res.status(200).send({ success: "a mail has been sent to your email..!" });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(
      `forgetPassword controller : from authControllers ${error.message} `,
    );
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token)
      return res.status(404).send({ error: "404 || page not found..!" });

    if (!newPassword)
      return res.status(404).send({ error: "password is required..!" });

    const decoded = verifyResetPassToken(token);

    if (!decoded) return res.status(400).send({ error: "invalid request1..!" });

    const existingUser = await userSchema.findOne({
      resetPasswordToken: decoded,
    });

    if (!existingUser)
      return res.status(400).send({ error: "invalid request2..!" });

    existingUser.password = newPassword;
    existingUser.resetPasswordToken = "";
    existingUser.resetPasswordTokenExpiry = null;
    existingUser.save();

    res.status(201).send({ success: "password changed successfully" });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(
      `resetPassword controller : from authControllers ${error.message}`,
    );
  }
};

const getProfile = async (req, res) => {
  try {
    const existingUser = await userSchema
      .findById(req.user._id)
      .select(
        "-password -otp -otpExpiry -resetPasswordToken -resetPasswordTokenExpiry -updatedAt",
      );

    if (!existingUser)
      return res.status(400).send({ error: "invalid request..!" });
    res.status(200).send({ error: "profile details", existingUser });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(
      `getProfile controller : from authControllers ${error.message}`,
    );
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName, phone, address } = req.body;
    const user_id = req.user._id;
    const avatar = req.file;

    const existingUser = await userSchema
      .findById(user_id)
      .select(
        "-password -otp -otpExpiry -resetPasswordToken -resetPasswordTokenExpiry -updatedAt",
      );

    if (avatar) {
      const imageResponse = await uploadToCloudinary(avatar, "avatar");
      const publicId = existingUser.avatar.split("/").pop().split(".")[0];
      deleteFromCloudinary(`avatar/${publicId}`);
      existingUser.avatar = imageResponse?.secure_url;
    }

    if (fullName) existingUser.fullName = fullName;
    if (phone) existingUser.phone = phone;
    if (address) existingUser.address = address;

    existingUser.save();

    res.status(200).send({ success: "profile has been updated..!" });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(
      `updateProfile controller : from authControllers ${error.message}`,
    );
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.REFRESH_TOKEN;

    if (!refreshToken) res.status(400).send({ error: "invalid request" });

    const decoded = verifyToken(refreshToken);
    if (!decoded)
      return res.status(400).send({ error: "user data not found..!" });

    const accessToken = generateAccessToken(decoded);
    res.cookie("ACCESS_TOKEN", accessToken, {
      maxAge: 7200000,
      httpOnly: false,
      secure: false,
      // sameSite: "None",
    });
    return res
      .status(201)
      .send({ success: "token created successfully..!", accessToken });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(
      `refreshAccessToken controller : from authControllers ${error.message}`,
    );
  }
};

module.exports = {
  signUp,
  verifyOtp,
  resendOtp,
  signIn,
  forgetPassword,
  resetPassword,
  getProfile,
  updateProfile,
  refreshAccessToken,
};
