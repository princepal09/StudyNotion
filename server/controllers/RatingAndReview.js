const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

exports.createRating = async (req, res) => {
  try {
    // get userId
    const userId = req.user.id;

    // fetch data from req body
    const { rating, review, courseId } = req.body;

    // check if user is enrolled or not
    const courseDetails = await findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }
    // check if user already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course is already reviewed by the user",
      });
    }
    // create rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    // update course with this rating /review
    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
      },
      { new: true },
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Rating and Reviews created successfully!",
      ratingReview,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error while creating createRating`,
      error: err.message,
    });
  }
};


// getAverageRating

exports.getAverageRating = async(req, res) =>{
  try{
    // get Course Id
    const courseId = req.body.courseid;

    // calculate average rating 

    const result = await RatingAndReview.aggregate([
      {
            $match : {
              course : new mongoose.Types.ObjectId(courseId),
            },
      },
      {
        $group : {
          _id : null,
          averageRating : { $avg : "rating"},
        }
      }

    ])

    // return rating
    if(result.length > 0){
      return res.status(200).json({
          success : true,
          averageRating : result[0].averageRating
      })
    }

    // if no rating/review exists
    return res.status(200).json({
      success : true,
      message : "Average rating is 0, no ratings given till now",
      averageRating : 0,
    })

  }catch(err){
    return res.status(500).json({
      success: false,
      message: `Error while creating createRating`,
      error: err.message,
    });

  }
}


exports.getAllRating = async(req, res) =>{
  try{
    const allReviews = await RatingAndReview.find({}).sort({rating : "desc"}).populate({
      path : "user",
      select : "firstName, lastName, email, image"
    }).populate({
      path : "course",
      select : "coursName"
    }).exec();

    return res.status(200).json({
      success : true,
      message : "Get all rating ",

    })
    

  }catch(err){
    return res.status(500).json({
      success: false,
      message: `Error while creating createRating`,
      error: err.message,
    });


  }
}