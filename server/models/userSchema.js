const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    avatar: String,
    fullName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      default: "+880",
    },
    address: String,
    role: {
      type: String,
      default: "user",
      enum: ["admin", "editor", "user"],
    },
    otp: {
      type: Number,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otpExpiry: Date,
    refreshToken: String,
    refreshTokenExpiry: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) {
    return;
  }

  try {
    return (user.password = await bcrypt.hash(user.password, 10));
  } catch (error) {
    console.log(`password bcrypt function from userSchema ${error.message}`);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("user", userSchema);
