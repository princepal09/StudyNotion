const RatingAndReview = require("../models/RatingAndReview")
const Course = require('../models/Course')

exports.createRating  = async(req,res) =>{
    try{
      // get userId
      const userId = req.user.id

      // fetch data from req body 
      const{rating, review, courseId} =  req.body
      
      // check if user is enrolled or not
      const courseDetails = await findOne({_id:courseId})
      // check if user already reviewed the course
      // create rating and review
      // update course with this rating /review
      // return response 


    }catch(err){
        return res.status(400).json({
      success : false,
      message : `Error while creating createRating`,
      error : err.message

    })
    }
}