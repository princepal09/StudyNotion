const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

const sendVerificationEmail = async (email, otp) => {
  try {
    const mailResponse = await mailSender(
      email,
      otp,
      "Verification Email from StudyNotion"
    );
    console.log("Email Sent Successfully :", mailResponse);
  } catch (err) {
    console.log("Error occured while sending mails:", err);
    throw err;
  }
};

OTPSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
