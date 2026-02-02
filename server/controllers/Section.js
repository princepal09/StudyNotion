const Section = require("../models/Section");
const Course = require("../models/Course");

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
      .populate("courseContent")
      .exec();

    // return response
    return res.status(200).josn({
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
    const { sectionName, sectionId } = req.body;

    // data validation
    if ((!sectionName ||!sectionId)) {
      return res.status(400).json({
        success: false,
        message: "Missing properties",
      });
    }
    // update data
    const updatedSection = Course.findByIdAndUpdate(
      sectionId,
      {
        sectioName: sectionName,
      },
      { new: true },
    );

    // return response
    return res.status(200).josn({
      success: true,
      message: "Section updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Unable to Update the Section",
      err: err.mesasge,
    });
  }
};

// delete Section

exports.deleteSection = async (req, res) => {
  try {
    // fetchDetail
    const { sectionId, courseId } = req.body;

    // data validation
    if ((!sectionId || !courseId)) {
      return res.status(400).json({
        success: false,
        message: "Missing properties",
      });
    }

    // delete Section
    const deletedSection = await Section.findByIdAndDelete(sectionId);

     
    if(!deletedSubSection){
        return res.status(404).json({
            success : false,
            message : "User not found "
        })
    }


    // pull from course Section
    const updatedSection = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: {
          courseContent: deletedSection._id,
        },
      },
      {
        new: true,
      },
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Unable to Delete the Section",
      err: err.mesasge,
    });
  }
};
