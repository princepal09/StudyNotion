const Course = require("../models/Course");
const Category = require("../models/Categories");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Create Course Handler function
exports.createCourse = async (req, res) => {
  try {
    // data fetch
    const { courseName, courseDescription, whatYouWillLearn, price, category } =
      req.body;

    // get thumbnail
    const thumbnail = req.files.thumbnailImage;

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory!",
      });
    }

    // intructor Validation (check for instructor)
    const userId = req.user.id;
    const intructorDetails = await User.findById(userId);
    console.log("Instructor Details", intructorDetails);

    // ! TODO : Verify that userId and instructorDetails._id are same or different ?

    if (!intructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }

    // tag -> VAlid , given tag is valid or not
    const categoryDetails = await Category.FindByID(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Tag Details not found",
      });
    }

    // Upload Image to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME,
    );

    // create an entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: intructorDetails._id,
      whatYouWillLearn,
      price,
      tag: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // add the new course to the user Schema of Instructor
    await User.findByIdAndUpdate(
      { _id: intructorDetails._id },
      {
        $push: { course: newCourse._id },
      },
      { new: true },
    );

    // Update the Tag Schema
    await Category.findByIdAndUpdate(
      {
        _id: intructorDetails._id,
      },
      {
        $push: { course: newCourse._id },
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Course Created Successfully !",
      data: newCourse,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Failed to Create Course",
      error: err.message,
    });
  }
};

// Get All courses Handler Function
exports.getAllCourses = async (req, res) => {
  try {
    // ! TODO -> Change the below statement incrementally

    const allCourses = await Course.find({}).populate("instructor").exec();

    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched Successfully",
      data: allCourses,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to get all Courses",
      error: err.message,
    });
  }
};


// getCourseDetails
exports.getCourseDetails = async(req, res) =>{
  try{
    // get id
    const {courseId} = req.body;

    // find course Details
    const courseDetail = await Course.find({_id:courseId}).populate({
      path : "instructor",
      populate : {
        path : "additionalDetails"
      }
    }).populate("category").populate("ratingAndReviews").populate({
      path : "courseContent",
      populate : {
        path : "subSection"
      }
    }).exec();

    if(!courseDetail)return res.status(400).json({
      success : false,
      message : `Could not find the course with course Id ${courseId}`

    })


    return res.status(200).json({
      success : true,
      message : "Course Details fetched Successfully",
      courseDetail
    })

  }catch(err){
    return res.status(400).json({
      success : false,
      message : `ERROOOOOOOOO`,
      error : err.message

    })


  }
}