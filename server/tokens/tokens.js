const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15d" }
  );
};
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.log(`verifyToken: from tokens ${error.message}`);
    return null;
  }
};

const generateResetPasswordToken = (user) => {
  const resetPassToken = crypto.randomBytes(16).toString("hex");
  const resetPassHashedToken = crypto
    .createHash("sha256")
    .update(resetPassToken)
    .digest("hex");
  return { resetPassHashedToken, resetPassToken };
};

const verifyResetPassToken = (token) => {
  const resetPassToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  return resetPassToken;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  generateResetPasswordToken,
  verifyResetPassToken,
};
