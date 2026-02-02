const OTP = require("../models/OTP");
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mailSender } = require("../utils/mailSender");
require("dotenv").config();

// sendOTP
exports.sendOTP = async (req, res) => {
  try {
    // fetch email from the request body
    const { email } = req.body;
    const checkUserPresent = await User.findOne({ email });

    // if user already exists, then return a response
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    // generate OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("OTP Generated :", otp);

    // check OTP , is unique or not
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    // create an entry for OTP
    const otpBody = await OTP.create({ email, otp });

    // return response successfully
    return res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp: otp,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// SignUp
exports.signUp = async (req, res) => {
  try {
    // data fetch from request body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;
    // do validate
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All feilds are required",
      });
    }

    // match the both two passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: true,
        message:
          "Password and Confirm Password Value doesn't match, Please try again",
      });
    }
    // Check user already exists or not before
    const exisingUser = await User.findOne({ email });
    if (exisingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already Registered",
      });
    }

    // Find more Recent OTP Stored for the user
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);

    // VAlidate OTP
    if (recentOtp.length === 0) {
      // OTP not found
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp.otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "OTP not matching",
      });
    }
    // Hash password
    const hashedPassword = bcrypt.hash(password, 10);
    //Centry Create in DB
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(201).json({
      success: true,
      message: "User is Registered Successfully!!",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "User Cannot be registered Please try again ",
    });
  }
  //return res
};

// Login
exports.login = async (req, res) => {
  try {
    // get data from req body
    const { email, password } = req.body;

    // validation check
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "  All feilds are required",
      });
    }

    // user check exists or not
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, please signup first",
      });
    }

    // generate jwt after password matching
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user,
        id: user.id,
        accountType: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;

      // create cookie and response

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in Successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is Incorrect",
      });
    }
  } catch (err) {
    console.log("Failed to Login", err);
  }
};

// change Password' 
exports.changePassoword = async (req, res) => {
  try {
    const { currPwd, newPwd, confirmPwd } = req.body;
    if (!currPwd || !newPwd || !confirmPwd) {
      return res.status(400).json({
        success: false,
        message: "All fields are required !",
      });
    }

    if (newPwd !== confirmPwd) {
      return res.status(400).json({
        success: false,
        message: "OOps  Passwords are not matching !",
      });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isPwdMatch = await bcrypt.compare(currPwd, user.password);

    if (!isPwdMatch) {
      return res.status(401).json({
        success: false,
        message: "Your current password is wrong! Please try again",
      });
    }

    const hashedPwd = await bcrypt.hash(confirmPwd, 10);

    await User.findByIdAndUpdate(
      userId,
      { password: hashedPwd },
      { new: true },
    );

    // orr weeee can dooo itttttt  =====>
    //   user.password = hashedPwd
    //  await user.save();

    await mailSender(
      user.email,
      "Hey, your password was updated successfully.",
      "Your Password is Updated",
    );

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error While changing passowrd !!",
      error: err.message,
    });
  }
};
