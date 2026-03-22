const mongoose = require("mongoose");
const { sendVerificationEmail } = require("../mail/mailTypes");

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
    default: Date.now,
    expires: 5 * 60, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

// Define a function to send emails



// Define a post-save hook to send email after the document has been saved

OTPSchema.pre("save", async function (next) {
  // Only send an email when a new document is created
  console.log("New document saved to database");
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
});

module.exports = mongoose.model("OTP", OTPSchema);
