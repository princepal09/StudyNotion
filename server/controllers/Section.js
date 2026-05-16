const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection")
// createSection
exports.createSection = async (req, res) => {
  try {
    // data fetch
    const { sectionName, courseId } = req.body;
    // data validation
    if ((!sectionName || !courseId)) {
      return res.status(400).json({
        success: false,
        mesasge: "Missing Properties",
      });
    }
    //create section
    const newSection = await Section.create({ sectionName });
    console.log("New Section :", newSection);

    // update course with section ObjectId
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true },
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection"
        }
      })
      .exec();

    // console.log(updatedCourseDetails)

    // return response
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Unable to create section, please try again later",
      err: err.message,
    });
  }
};

// updateSection
exports.updateSection = async (req, res) => {
  try {
    // data fetch
    const { sectionName, sectionId, courseId } = req.body;
    

    // data validation
    if ((!sectionName || !sectionId)) {
      return res.status(400).json({
        success: false,
        message: "Missing properties",
      });
    }
    // update data
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectioName: sectionName,
      },
      { new: true },
    );

    const course = await Course.findById(courseId).populate({
      path : "courseContent",
      popualte : {
        path : "subSection"
      }
    }).exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data : course
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Unable to Update the Section",
      err: err.message,
    });
  }
};

// delete Section

exports.deleteSection = async (req, res) => {
  try {
    // fetchDetail
    const { sectionId, courseId } = req.body;
    console.log(sectionId)


    // data validation
    if ((!sectionId || !courseId)) {
      return res.status(400).json({
        success: false,
        message: "Missing properties",
      });
    }

    // delete Section
    const deletedSection = await Section.findByIdAndDelete(sectionId);

    if (!deletedSection) {
      return res.status(404).json({
        success: false,
        message: "User not found "
      })
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: { courseContent: sectionId }
      }, {
      new: true,
    }
    );

    // Delete all subsections belonging to this section
    await SubSection.deleteMany({
      _id: { $in: deletedSection.subSection }
    });

    return res.status(200).json({
      success: true,
      message: "Section Deleted Successfully",
      updatedCourse
    })


  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Unable to Delete the Section",
      err: err.message,
    });
  }
};
