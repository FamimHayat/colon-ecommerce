const generateOTP = require("../helpers/generateOtp");
const { sendEmail } = require("../helpers/sendEmail");
const userSchema = require("../models/userSchema");
const { EmailVerifyOtpTemplate } = require("../utils/templates");

const isValidEmail = require("../utils/validations");

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
    console.log(otp);

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

    const existingUser = await userSchema.findOne({
      email,
      otp: Number(otp),
      otpExpiry: { gt: new Date() },
      isVerified: false,
    });
    if (!existingUser)
      return res.status(404).send({ error: "invalid credential..!" });

    existingUser.otp = null;
    existingUser.otpExpiry = null;
    existingUser.isVerified = false;
    existingUser.save();

    res.status(200).send({ error: "otp verification successful..!" });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(
      `verifyOtp controller : from authControllers ${error.message} `
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
    if (!password)
      return res.status(400).send({ error: "password is required..!" });

    const passwordMatch = await existingUser.comparePassword(password);
    if (!passwordMatch)
      return res.status(400).send({ error: "password does not match..!" });

    res.status(200).send({ success: "logged in successfully..!" });
  } catch (error) {
    res.status(500).send({ error: "500 || internal server error..!" });
    console.log(`signIn controller : from authControllers ${error.message} `);
  }
};

module.exports = { signUp, verifyOtp, signIn };
