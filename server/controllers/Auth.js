const OTP = require("../models/OTP");
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mailSender } = require("../mail/mailService");
const Profile = require("../models/Profile")
require("dotenv").config();
const { passwordUpdated } = require("../mail/mailTypes");
const { oauth2client } = require("../config/oauth");
const axios = require("axios")

const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=`
// sendOTP
exports.sendOTP = async (req, res) => {
	try {
		// fetch email from the request body
		console.log("otp body hit hua")
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

// Signup Controller for Registering USers

exports.signUp = async (req, res) => {
	try {
		// Destructure fields from the request body
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			contactNumber,
			otp,
		} = req.body;
		// Check if All Details are there or not
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!otp
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		// Check if password and confirm password match
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

		// Find the most recent OTP for the email
		const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		console.log("response", response);
		if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid because otp data is empty for this email",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

		// Create the Additional Profile For User
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});

		console.log("profileDetails", profileDetails)
		const user = await User.create({
			firstName,
			lastName,
			email,
			contactNumber,
			password: hashedPassword,
			accountType: accountType,
			approved: approved,
			additionalDetails: profileDetails._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};

// Login
exports.login = async (req, res) => {
	try {


		// get data from req body
		const { email, password, accountType } = req.body;

		// validation check
		if (!email || !password) {
			return res.status(403).json({
				success: false,
				message: "  All feilds are required",
			});
		}


		// user check exists or not
		const user = await User.findOne({ email }).populate("additionalDetails").exec()
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "User is not registered, please signup first",
			});
		}



		if (user.accountType !== accountType) {
			return res.status(401).json({
				success: false,
				message: "Please SignUp first"
			})
		}




		// generate jwt after password matching
		if (await bcrypt.compare(password, user.password)) {
			const payload = {
				user: user,
				id: user._id,
				accountType: user.accountType,
			};

			const token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: '7d'
			})
			user.token = token;
			user.password = undefined;

			// create cookie and response

			const options = {
				httpOnly: true,
				secure: false,
				sameSite: 'none',
				maxAge: 7 * 24 * 60 * 60 * 1000

			};

			res.cookie("token", token, options).status(200).json({
				success: true,
				token: token,
				user,
				message: "Logged in Successfully",
			});
		} else {
			console.log("Password is incorrect")
			return res.status(401).json({

				success: false,
				message: "Password is Incorrect",
			});
		}
	} catch (err) {
		console.log("Failed to Login", err);
		return res.status(500).json({
			success: false,
			message: err.message,
		})
	}
};

exports.google = async (req, res) => {
	try {
		const { code, accountType } = req.body

		if (!code || !accountType) {
			return res.status(400).json({
				success: false,
				message: "Authorization code and accountType is required",
			});
		}

		const { tokens } = await oauth2client.getToken(code);
		oauth2client.setCredentials(tokens);

		const userRes = await axios.get(`${url}${tokens.access_token}`)
		console.log("Google User:", userRes.data)

		const { email, name, picture } = userRes.data
		const names = name.split(" ");
		console.log("names", names)


		// user check exists or not
		let user = await User.findOne({ email }).populate("additionalDetails").exec()

		if (!user) {
			const profileDetails = await Profile.create({
				gender: null,
				dateOfBirth: null,
				about: null,
				contactNumber: null,
			});
			user = await User.create({
				email,
				firstName: names[0],
				lastName: names[1],
				accountType,
				provider: 'google',
				additionalDetails: profileDetails._id,
				image: picture,
			});

			user = await User.findById(user._id)
				.populate("additionalDetails")
				.exec();
		}



		if (user.accountType !== accountType) {
			return res.status(401).json({
				success: false,
				message: "This account is registered as a different user type."
			})
		}


		const payload = {
			user: user,
			id: user._id,
			accountType: user.accountType,
		};


		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: '7d'
		})


		user.token = token;
		user.password = undefined;

		// create cookie and response

		const options = {
			httpOnly: true,
			secure: false,
			sameSite: 'none',
			maxAge: 7 * 24 * 60 * 60 * 1000

		};

		res.cookie("token", token, options).status(200).json({
			success: true,
			token: token,
			user,
			message: " Logged in Successfully",
		});

	} catch (err) {
		console.log("Failed to Login", err);
		return res.status(500).json({
			success: false,
			message: err.message,
		})
	}

}


// Controller for Changing Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		console.log(req.user)
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword } = req.body;
		console.log(oldPassword, newPassword)

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			console.log("The old password is incorrect")
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		// if (newPassword !== confirmNewPassword) {
		// 	// If new password and confirm new password do not match, return a 400 (Bad Request) error
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "The password and confirm password does not match",
		// 	});
		// }

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);
		console.log("updatedUSer", updatedUserDetails)

		// Send notification email
		try {
			const emailResponse = await passwordUpdated(
				updatedUserDetails.email,
				updatedUserDetails.firstName
			);
			console.log("Email sent successfully:");
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error.message);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};

// exports.refreshToken = async (req, res) => {
// 	try {

// 		const { token } = req.cookies

// 		if (!token) {
// 			return res.status(401).json({
// 				success: false,
// 				message: "Refresh Token is not available"
// 			})
// 		}

// 		const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_JWT_SECRET)
// 		console.log(decoded)

// 		const payload = {
// 			user: decoded.user,
// 			id: decoded._id,
// 			accountType: decoded.accountType,
// 		}
// 		const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_JWT_SECRET, {
// 			expiresIn: '15m'
// 		})
// 		const newRefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_JWT_SECRET, {
// 			expiresIn: '7d'
// 		})

// 		const options = {
// 			httpOnly: true,
// 			secure: false,
// 			sameSite: 'none',
// 			maxAge: 7 * 24 * 60 * 60 * 1000 // 7days
// 		}


// 		return res.cookie("token", token, options).status(200).json({
// 			success: true,
// 			token: newAccessToken,
// 			user: decoded.user
// 		});


// 	} catch (err) {
// 		console.log(err);
// 		return res.status(500).json({
// 			success: false,
// 			message: "Internal server error while refresh the token"
// 		})
// 	}
// }