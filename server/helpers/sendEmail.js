const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

const sendEmail = async ({ email, subject, otp, html }) => {
  await transporter.sendMail({
    from: `"colon" <${process.env.GOOGLE_APP_EMAIL}>`,
    to: email,
    subject,
    html,
  });
};

module.exports = { sendEmail };
