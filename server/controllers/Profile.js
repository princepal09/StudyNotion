const Profile = require("../models/Profile");
const User = require("../models/Profile");

// Update Profile

exports.updateProfile = async (req, res) => {
  try {
    // get data
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;

    // get userId
    const id = req.user.id;

    // validation
    if (!contactNumber || !gender || !id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required ",
      });
    }
    // find Profile
    const userDetails = await User.findById(id);
    const profileId = await userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    // update Profile
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;

    await profileDetails.save();

    // return response
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully ",
      profileDetails,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      err: err.message,
    });
  }
};

// deleteAccount
// TODO ==> How can we schedule this deletion operation
exports.deleteAccount = async (req, res) => {
  try {
    // get id
    const id = req.user.id;

    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const userDetails = await User.findById(id);

    // delete profile
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    // TODO :  HW unenroll user form all enrolled courses
    //delete user
    await User.findByIdAndDelete({ _id: id });

    // return response
    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully ",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting Account",
      err: err.message,
    });
  }
};

// getAllUserDetails

exports.getAllUserDetails = async (req, res) => {
  try {
    // get id
    const id = req.user.id;

    // validation
    if (!id) {
      return res.status(200).json({
        success: false,
        message: "Id not found",
      });
    }

    const userDetails = await Profile.findById(id)
      .populate("additionalDetails")
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "User data Fetched Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while Fetching Account",
      err: err.message,
    });
  }
};
