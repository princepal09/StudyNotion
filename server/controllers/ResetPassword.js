const User = require("../models/User");
const { mailSender } = require("../utils/mailSender");
const bcrypt = require("bcrypt");

// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
  try {
    // get email from req body
    const email = req.body.email;
    // check user for this email, email validation
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Your email is not registered with us ",
      });
    }
    // generate token
    const token = crypto.randomUUID();
    // update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true },
    );
    // create URL
    const url = `http://localhost:3000/update-password/${token}`;

    // send mail containing the URL
    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link: ${url}`,
    );
    // return response
    return res.status(200).json({
      success: true,
      message: "Email Sent Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while resetting the password ",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    //data fetch
    const { token, password, confirmPassword } = req.body;
    //validation
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password is not Matching",
      });
    }
    //getuserdetails from db using token
    const userDetails = await User.findOne({ token });

    // if no entry - invalid token
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token invalid",
      });
    }

    // token time check
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "Token is Expired, please regenerate your token ",
      });
    }

    // hash pwd
    const hashedPwd = await bcrypt.hash(confirmPassword, 10);
    //update password
    await User.findOneAndUpdate(
      { token },
      { password: hashedPwd },
      { new: true },
    );
    // return response
    return res.status(200).json({
      success: true,
      message: "Password reset Succcefully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrog while reset password",
    });
  }
};
