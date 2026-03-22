const { mailSender } = require("./mailService");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

exports.sendVerificationEmail = async (email, otp) => {
  // Create a transporter to send emails

  // Define the email options

  // Send the email

  try {
    const mailResponse = await mailSender(
      email,
      "Verification Mail",
      emailTemplate(otp)
    );
    console.log("Email Sent Successfully :", mailResponse.response);
  } catch (err) {
    console.log("Error occured while sending mails:", err);
    throw err;
  }
};