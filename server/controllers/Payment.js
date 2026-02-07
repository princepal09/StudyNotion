const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");


// capture the payment and inititate the Razorpay order
exports.capturePayment = async (req, res) => {
  // get courseId and userID
  const { course_id } = req.body;
  const userId = req.user.id;

  // validation
  // validate courseId
  if (!course_id) {
    return res.json({
      success: false,
      message: "Please Provide valid courseId",
    });
  }

  // valid CourseDetail
  let course;
  try {
    course = await Course.findById(course_id);
    if (!course) {
      return res.json({
        success: false,
        message: "Could not find the course",
      });
    }

    // User already pay for the same course
    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: "Student is already enrolled",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }

  // order create
  const amount = course.price;
  const currency = "INR";
  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      courseId: course_id,
      userId,
    },
  };
  try {
    // initiate the payment using razorpay
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);

    // return response
    return res.status(200).json({
      success: true,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Could not initiate order",
    });
  }
};

// Verify Signature of Razorpay and Server
exports.verifySignature = async (req, res) => {
  const webHookSecret = "123456";
  const signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.createHmac("sha256", webHookSecret);
  shasum.update(JSON.stringify(req.body));

  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log("Payment is Authorized");
    try {
      const { courseId, userId } = req.body.payload.payment.entity.notes;

      // find the course and enroll the student in it;

      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true },
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not found",
        });
      }

      console.log(enrolledCourse);

      // find the student the course to their list enrolle

      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true },
      );
      console.log(enrolledStudent);

      // send Verification Mail

      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulations from Prince Pal",
        "fasdgdgdgasdgdsgs",
      );

      console.log(emailResponse);

      return res.status(200).json({
        success: true,
        message: "Signature Verified and Course Added ",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
};
