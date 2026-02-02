const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create sub Section

exports.createSubSection = async (req, res) => {
  try {
    // fetch data from req body
    const { sectionId, title, timeDuration, description } = req.body;

    // extract file/video
    const video = req.files.videoFile;

    // validation
    if (!sectionId || !title || !timeDuration || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // upload video to cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME,
    );

    // create a subSection
    const subSectionDetails = await SubSection.create({
      title: title,
      description: description,
      timeDuration: timeDuration,
      videoUrl: uploadDetails.secure_url,
    });

    // update section with this sub Section objectId
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true },
    );

    //! log updated section here, after adding populate query

    // return response
    return res.status(500).json({
      success: true,
      message: "Created subsection successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error While Creating Sub Section ",
    });
  }
};

// update Sub Section

exports.updatedSubSection = async (req, res) => {
  try {
    const { subSectionId, title, timeDuration, description } = req.body;
    if (!subSectionId || !title || timeDuration || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // updatedSection
    const updatedSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      {
        subSectionId: subSectionId,
        title: title,
        timeDuration: timeDuration,
        description: description,
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Subsection Updated Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error While Updating Sub Section ",
    });
  }
};

// delete Sub Section

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId, title, timeDuration, description } =
      req.body;
    const video = req.files.videoFile;

    if (
      !subSectionId ||
      !title ||
      !video ||
      !sectionId ||
      !timeDuration ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);
    
    if(!deletedSubSection){
        return res.status(404).json({
            success : false,
            message : "User not found "
        })
    }

    const updatedSubSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: {
          subSection: deletedSubSection._id,
        },
      },
      { new: true },
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error While Updating Sub Section ",
    });
  }
};
