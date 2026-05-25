const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");
const { mailSender } = require("../mail/mailService");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");


// capture the payment and inititate the Razorpay order
exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  if (courses.length == 0) {
    return res.josn({ success: false, message: "Please Provide Course Id" })

  }

  let totalAmount = 0;

  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res.status(200).josn({ success: false, message: "Could not find the course" })
      }

      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(200).josn({ success: false, message: "Student is already enrolled" })
      }

      totalAmount += course.price;


    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: err.message
      })
    }


  }


  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }

  try {
    const paymentResponse = await instance.orders.create(options);
    res.json({
      success: true,
      message: paymentResponse
    })
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: 'Could not Initiate order'
    })
  }
}


// Verify the payment 
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payement_id = req.body?.razorpay_payement_id
  const razorpay_signature = req.body?.razorpay_signature
  const courses = req.body?.courses;
  const userId = req.user.id;

  if (!razorpay_order_id || !razorpay_payement_id || !razorpay_signature || !courses || !userId) {
    return res.status(200).json({
      success: false,
      message: "Payment Failed"
    })


  }

  let body = razorpay_order_id + "|" + razorpay_payement_id;
  const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex")

  if (expectedSignature === razorpay_signature) {
    // enroll the student

    await enrollStudents(courses, userId, res);

    // return response
    return res.status(200).json({
      success: true,
      message: "Payment Verified"
    })
  }


  return res.status(200).json({
    success: false,
    message: 'Payment Failed'
  })

}

const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please provide data for Courses or UserId"
    })
  }

  for (const courseId of courses) {
        try{
             // find the course and enroll these students in it
    const enrolledCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      {
        $push: {
          studentsEnrolled : userId
        }
      },
      { new: true }
    )

  if (!enrolledCourse) {
    return res.status(500).json({
      success: false,
      message: "Course not found"
    })
  }

  // find the student and add the course to their list of enrolledCourses

  const enrolledStudent = await User.findByIdAndUpdate(userId,
    {
      $push: {
        courses: courseId
      }
    },
    {
      new: true
    }
  )

  // send mail to student

  const emailResponse = await mailSender(
    enrolledStudent.email,
    `Successfully Enrolled into ${enrolledCourse.courseName}`,
    courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName + enrolledStudent.lastName}`)
  )

  console.log("Email Sent Successfully", emailResponse);
        }
        catch(err){
          console.log(err);
          return res.status(500).json({
            success : false,
            message : err.message
          })
        }
  }



}